// Auth
import { auth } from "@/auth";

// Next
import { headers as _headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const headers = await _headers();

	const data = await auth.api.signOut({
		headers,
	});

	if (data?.success === true) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.redirect(new URL("/?error=signout", request.url));
}
