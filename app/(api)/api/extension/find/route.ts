import { type NextRequest, NextResponse } from "next/server";

type Note = {
  id: string; // The note's id
  url: string; // The url that this note is associated with
  rating: "helpful" | "not_helpful" | "not_enough_votes"; // The note's rating
  text_match: string; // The text that this note is about
  context: string; // The note's content
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const url = searchParams.get("url");

  // TODO: list any notes that match the url (exact match but exclude search params or url fragments)
  const notes: Note[] = [];

  return NextResponse.json({ notes });
}
