import { type NextRequest, NextResponse } from "next/server";
import { createSchema } from "../schemas";
import { createSupaClient } from "@/utils/supabase/supa";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const result = createSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{ error: "Invalid input", details: result.error.issues },
				{ status: 400 },
			);
		}

		const { note } = result.data;

		const supa = createSupaClient();

		// TODO: Implement note creation logic

		return NextResponse.json({ status: "created", note });
	} catch (error) {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}
}
