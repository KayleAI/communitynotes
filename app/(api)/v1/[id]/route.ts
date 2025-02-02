// Next
import { type NextRequest, NextResponse } from "next/server";

// Supabase
import { createSupaClient } from "@/utils/supabase/supa";

// Utils
import { validateApiKey } from "@/utils/auth/keys";

const MIN_VOTES = 5;
const HELPFUL_THRESHOLD = 0.65;

function calculateScore(votes: Array<{ vote: string }>) {
	const helpful = votes.filter((vote) => vote.vote === "helpful").length;
	const total = votes.length;

	if (total < MIN_VOTES) {
		return "not_enough_votes";
	}

	const helpfulRatio = helpful / total;
	return helpfulRatio >= HELPFUL_THRESHOLD ? "helpful" : "not_helpful";
}

export async function GET(
	request: NextRequest,
	{ params }: Readonly<{ params: Promise<{ id: string }> }>,
) {
	const { id } = await params;
	const { data, error } = await validateApiKey(request);

	const userId = data?.userId;

	if (error || !userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const supa = createSupaClient();

	const { data: note, error: noteError } = await supa
		.from("notes")
		.select(
			"id, content_id, created_at, context, author:note_authors(id, name), votes:note_votes(vote, external_id)",
		)
		.or(`id.eq.${id},content_id.eq.${id}`)
		.single();

	if (noteError) {
		return NextResponse.json({ error: "Note not found" }, { status: 404 });
	}

	const noteData = {
		...note,
		author: note.author,
		votes: {
			helpful: note.votes.filter((vote) => vote.vote === "helpful").length,
			not_helpful: note.votes.filter((vote) => vote.vote === "not_helpful")
				.length,
			total: note.votes.length,
			score: calculateScore(note.votes),
		},
	};

	return NextResponse.json({ status: "ok", note: noteData });
}
