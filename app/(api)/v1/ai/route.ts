// Next
import { type NextRequest, NextResponse } from "next/server";

// Schemas
import { aiSchema } from "../schemas";

// Supabase
import { createSupaClient } from "@/utils/supabase/supa";

// Auth
import { validateApiKey } from "@/utils/auth/keys";

// AI
import { perplexity } from "@ai-sdk/perplexity";
import { generateText } from "ai";

export async function POST(request: NextRequest) {
	const { data, error } = await validateApiKey(request);

	const userId = data?.userId;

	if (error || !userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const result = aiSchema.safeParse(body);

		if (!result.success) {
			console.log("Invalid input", result.error.issues);
			return NextResponse.json(
				{ error: "Invalid input", details: result.error.issues },
				{ status: 400 },
			);
		}

		const { content_id, content } = result.data;

		const context = await createNoteUsingAi(content);

		if (!context) {
			console.log("AI chose not to create a note.");
			return NextResponse.json({
				status: "no_note",
				message: "AI chose not to create a note.",
			});
		}

		const supa = createSupaClient();

		const { data: authorData, error: authorError } = await supa
			.from("note_authors")
			.upsert(
				{
					user_id: userId,
					external_id: "00000000-0000-0000-0000-000000000000",
					name: "Perplexity AI",
				},
				{
					onConflict: 'user_id,external_id'
				}
			)
			.select("id")
			.single();

		const authorId = authorData?.id;

		if (authorError) {
			console.error("Failed to create author", authorError);
			return NextResponse.json(
				{ error: "Failed to create author" },
				{
					status: 500,
				},
			);
		}

		const { data, error } = await supa
			.from("notes")
			.insert({
				user_id: userId,
				content_id: content_id,
				context,
				author_id: authorId,
			})
			.select("id")
			.single();

		if (error) {
			console.log("Failed to create note", error);
			return NextResponse.json(
				{ error: "Failed to create note" },
				{
					status: 500,
				},
			);
		}

		return NextResponse.json({ status: "created", id: data.id });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}
}

async function createNoteUsingAi(query: string) {
	const { text, experimental_providerMetadata } = await generateText({
		model: perplexity("sonar-pro"),
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant that creates Community Notes that provide context for a given piece of text. Where possible, you should cite reputable sources to support your note. If you are unable to find any relevant information, or if the information submitted by the user is reasonable and does not need a note, return `no_note`. You may also be provided with a URL to the page that the user is looking at, and you should also judge this as part of your decision to create a note.",
			},
			{
				role: "user",
				content: query,
			},
		],
	});

	const citations =
		(experimental_providerMetadata?.perplexity?.citations as string[]) ?? [];

	if (text.includes("no_note")) {
		return null;
	}

	let content = text;

	const citationsUsed = content.match(/\[(\d+)\]/g) ?? [];
	const uniqueCitations = [...new Set(citationsUsed)];

	const citationMap = Object.fromEntries(
		uniqueCitations.map((citation, index) => [citation, `[${index + 1}]`]),
	);

	for (const [oldCitation, newCitation] of Object.entries(citationMap)) {
		content = content.replaceAll(oldCitation, newCitation);
	}

	uniqueCitations.forEach((_, index) => {
		const match = /\d+/.exec(uniqueCitations[index]);
		const citation = citations[Number.parseInt(match?.[0] ?? "0") - 1];
		if (citation) {
			content += `${index + 1}. ${citation}\n`;
		}
	});

	return content;
}
