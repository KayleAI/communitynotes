import { createSupaClient } from "@/utils/supabase/supa";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url, context = "" } = await request.json();

  const supa = createSupaClient();

  const { data, error } = await supa
    .from("extension")
    .insert({
      url,
      phrase: context,
    })
    .select("request_id")
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const requestId = data?.request_id;

  const response = await fetch(
    new URL("/v1/ai", process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? request.url),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NOTES_API_KEY}`,
      },
      body: JSON.stringify({
        content_id: requestId,
        content: `${url} - ${context}`,
      }),
    },
  );

  const body = await response.json();

  const noteId = body?.id ?? undefined;
  const status = body?.status ?? undefined;

  if (status === "no_note") {
    return NextResponse.json({ status: "no_note" });
  }

  const { error: noteError } = await supa
    .from("extension")
    .update({
      note_id: noteId,
    })
    .eq("request_id", data?.request_id);

  if (noteError) {
    return NextResponse.json({ status: "error", error: noteError.message }, { status: 500 });
  }

  return NextResponse.json({ status: "created", note_id: noteId });
}
