import { type NextRequest, NextResponse } from "next/server";
import { voteSchema } from "../schemas";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const result = voteSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{ error: "Invalid input", details: result.error.issues },
				{ status: 400 },
			);
		}

		const { id, vote } = result.data;

		// A user has voted on a community note.
		// TODO: Implement voting logic

		return NextResponse.json({ status: "accepted", id });
	} catch (error) {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}
}
