import { createSupaClient } from "@/utils/supabase/supa";
import { type NextRequest, NextResponse } from "next/server";

type Note = {
  id: string; // The note's id
  url: string; // The url that this note is associated with
  rating: "helpful" | "not_helpful" | "not_enough_votes"; // The note's rating
  phrase: string; // The text that this note is about
  context: string; // The note's content
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const url = searchParams.get("url");

  const supa = createSupaClient();

  const { data, error } = await supa
    .from("extension")
    .select("url, phrase, notes(id, context, votes:note_votes(vote))")
    .eq("url", url);

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.warn("Found:", data);

  const notes: Note[] = data.flatMap((item) => {
    // Handle case where notes is a single object by wrapping it in an array
    const notesArray = Array.isArray(item.notes) ? item.notes : [item.notes];

    // Filter out null notes before mapping
    return notesArray.filter((note) => note != null).map((note) => {
      // Calculate rating based on votes
      const votes = note?.votes ?? [];
      const helpfulCount = votes.filter((v) => v.vote === "helpful").length;
      const notHelpfulCount = votes.filter(
        (v) => v.vote === "not_helpful",
      ).length;

      let rating: Note["rating"] = "not_enough_votes";
      if (votes.length >= 5) {
        rating = helpfulCount > notHelpfulCount ? "helpful" : "not_helpful";
      }

      return {
        id: note.id,
        url: item.url,
        rating,
        phrase: item.phrase,
        context: note.context,
      };
    });
  });

  return NextResponse.json({ notes });
}
