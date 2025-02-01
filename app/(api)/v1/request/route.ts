import { type NextRequest, NextResponse } from "next/server";
import { requestSchema } from "../schemas";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const result = requestSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{ error: "Invalid input", details: result.error.issues },
				{ status: 400 },
			);
		}

		const { id, context } = result.data;

		// A user has requested a community note to be created.
		// TODO: Implement request logic

		return NextResponse.json({ status: "accepted", id });
	} catch (error) {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}
}
