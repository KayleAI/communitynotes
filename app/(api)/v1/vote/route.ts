// Next
import { type NextRequest, NextResponse } from "next/server";

// Schemas
import { voteSchema } from "../schemas";

// Utils
import { createSupaClient } from "@/utils/supabase/supa";
import { validateApiKey } from "@/utils/auth/keys";

export async function POST(request: NextRequest) {
	const { data, error } = await validateApiKey(request);

	const userId = data?.userId;

	if (error || !userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const result = voteSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{ error: "Invalid input", details: result.error.issues },
				{ status: 400 },
			);
		}

		const { note_id, content_id, vote, external_id = null } = result.data;

		const supa = createSupaClient();

		let noteId = note_id;

		// if note_id is not provided, then we need to get the note_id from the content_id
		if (!noteId) {
			const { data: note, error } = await supa
				.from("notes")
				.select("id")
				.eq("content_id", content_id)
				.single();

			if (error || !note?.id) {
				return NextResponse.json(
					{
						error: "A note associated with this `content_id` does not exist",
					},
					{ status: 404 },
				);
			}

			noteId = note?.id;
		}

		if (!noteId) {
			return NextResponse.json({ error: "Note not found" }, { status: 404 });
		}

		const { data: existingVote, error: existingVoteError } = await supa
			.from("note_votes")
			.select("vote_id, vote")
			.eq("note_id", noteId)
			.eq("external_id", external_id)
			.maybeSingle();

		if (existingVoteError) {
			console.warn("Failed to get existing vote", existingVoteError);
			return NextResponse.json(
				{ error: "Failed to get existing vote" },
				{
					status: 500,
				},
			);
		}

		if (existingVote) {
			if (existingVote.vote === vote) {
				return NextResponse.json({
					status: "accepted",
					id: existingVote.vote_id,
				});
			}

			const { error: updateError } = await supa
				.from("note_votes")
				.update({ vote })
				.eq("vote_id", existingVote.vote_id);

			if (updateError) {
				console.warn("Failed to update vote", updateError);
				return NextResponse.json(
					{ error: "Failed to update vote" },
					{
						status: 500,
					},
				);
			}

			return NextResponse.json({
				status: "accepted",
				id: existingVote.vote_id,
			});
		}

		const { data, error } = await supa
			.from("note_votes")
			.insert({
				note_id: noteId,
				vote,
				external_id,
			})
			.select("vote_id")
			.single();

		if (error) {
			console.warn("Failed to create vote", error);
			return NextResponse.json(
				{ error: "Failed to create vote" },
				{
					status: 500,
				},
			);
		}

		return NextResponse.json({ status: "accepted", id: data.vote_id });
	} catch (error) {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}
}
