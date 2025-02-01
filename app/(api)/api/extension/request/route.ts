import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  // request a community note for the url (and the specific text (as part of the context in the request))

  return NextResponse.json({ status: "accepted" });
}
