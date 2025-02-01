// Next
import { type NextRequest, NextResponse } from "next/server";

// Supabase
import { createSupaClient } from "@/utils/supabase/supa";

// Utils
import { validateApiKey } from "@/utils/auth/keys";

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
		.select("*")
		.eq("id", id)
		.or(`content_id.eq.${id}`)
		.single();

	if (noteError) {
		return NextResponse.json({ error: "Note not found" }, { status: 404 });
	}

	return NextResponse.json({ status: "ok", note });
}
