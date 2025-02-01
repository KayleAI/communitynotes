// Next
import { type NextRequest, NextResponse } from "next/server";

// Schemas
import { requestSchema } from "../schemas";

// Supabase
import { createSupaClient } from "@/utils/supabase/supa";

// Utils
import { validateApiKey } from "@/utils/auth/keys";

export async function POST(request: NextRequest) {
	const { data, error } = await validateApiKey(request);

	const userId = data?.userId;

	if (error || !userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const result = requestSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{ error: "Invalid input", details: result.error.issues },
				{ status: 400 },
			);
		}

		const { content_id, context = null } = result.data;

		const supa = createSupaClient();

		const { data, error } = await supa
			.from("note_requests")
			.insert({
				user_id: userId,
				content_id,
				context,
			})
			.select("id")
			.single();

		if (error) {
			return NextResponse.json(
				{ error: "Failed to create request" },
				{
					status: 500,
				},
			);
		}

		return NextResponse.json({ status: "accepted", id: data.id });
	} catch (error) {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}
}
