import { type NextRequest, NextResponse } from "next/server";
import { createSchema } from "../schemas";
import { createSupaClient } from "@/utils/supabase/supa";

import { validateApiKey } from "@/utils/auth/keys";

export async function POST(request: NextRequest) {
  const { data, error } = await validateApiKey(request);

  const userId = data?.userId;

  if (error || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    let authorId = null;

    if (note.author) {
      const { data: author, error: authorError } = await supa.from(
        "note_authors",
      ).upsert({
        user_id: userId,
        external_id: note.author?.id,
        name: note.author?.name,
      }, {
        onConflict: "external_id,user_id",
        ignoreDuplicates: true,
      }).select("id").single();

      if (authorError) {
        return NextResponse.json({ error: "Failed to create author" }, {
          status: 500,
        });
      }

      authorId = author?.id;
    }

    const { data, error } = await supa.from("notes").insert({
      user_id: userId,
      content_id: note.content_id,
      context: note.context,
      author_id: authorId,
    }).select("id").single();

    if (error) {
      return NextResponse.json({ error: "Failed to create note" }, {
        status: 500,
      });
    }

    return NextResponse.json({ status: "created", id: data.id });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
