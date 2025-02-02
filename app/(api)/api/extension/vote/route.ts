import { createSupaClient } from "@/utils/supabase/supa";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { url, context = "", vote = "helpful" } = await request.json();

	if (!["helpful", "not_helpful"].includes(vote)) {
		return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
	}

	const supa = createSupaClient();

	let query = supa.from("extension").select("request_id").eq("url", url);

	if (context?.length > 0) {
		query = query.eq("phrase", context);
	}

	const { data, error } = await query.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const content_id = data?.request_id;

	if (!content_id) {
		return NextResponse.json({ error: "No content_id found" }, { status: 404 });
	}

	const response = await fetch(
		new URL("/v1/vote", process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? request.url),
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.NOTES_API_KEY}`,
			},
			body: JSON.stringify({
				content_id,
				vote,
			}),
		},
	);

	const body = await response.json();

	return NextResponse.json(body);
}
