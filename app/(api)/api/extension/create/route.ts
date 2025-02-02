import { type NextRequest, NextResponse } from "next/server";
import { createSupaClient } from "@/utils/supabase/supa";

export async function POST(request: NextRequest) {
	const { url, context = "", note = "" } = await request.json();

	const supa = createSupaClient();

	const { data, error } = await supa
		.from("extension")
		.insert({
			url,
			phrase: context,
		})
		.select("request_id")
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const response = await fetch(
		new URL(
			"/v1/create",
			process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? request.url,
		),
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.NOTES_API_KEY}`,
			},
			body: JSON.stringify({
				content_id: data?.request_id,
				content: note,
			}),
		},
	);

	const body = await response.json();

	const noteId = body.id;

	const { error: noteError } = await supa
		.from("extension")
		.update({
			note_id: noteId,
		})
		.eq("request_id", data?.request_id);

	if (noteError) {
		return NextResponse.json({ error: noteError.message }, { status: 500 });
	}

	return NextResponse.json({ status: "accepted" });
}
