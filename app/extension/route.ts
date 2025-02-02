import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
	return NextResponse.redirect(
		new URL(
			"/docs/extension",
			process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? request.nextUrl,
		),
	);
}
