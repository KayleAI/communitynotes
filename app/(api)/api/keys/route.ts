// Next
import { type NextRequest, NextResponse } from "next/server";

// Better Auth
import { auth } from "@/auth";
import { createHash } from "@better-auth/utils/hash";
import { createRandomStringGenerator } from "@better-auth/utils/random";

// Vercel KV
import { kv } from "@vercel/kv";

// Types
import type { KeyData } from "@/utils/auth/keys";

export const generateRandomString = createRandomStringGenerator(
  "A-Z",
  "0-9",
  "a-z",
);

async function authenticate(request: NextRequest) {
  const data = await auth.api.getSession({
    headers: request.headers,
  });

  if (!data?.user) {
    return null;
  }

  return data;
}

export async function GET(request: NextRequest) {
  const user = await authenticate(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const keys =
    await kv.hgetall<Record<string, KeyData>>(`user:${user.user.id}:keys`) ??
      {};

  // order by created date
  const sortedKeys = Object.values(keys).sort((a, b) => b.created - a.created);

  return NextResponse.json({ keys: sortedKeys });
}

export async function POST(request: NextRequest) {
  const user = await authenticate(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name = "" } = await request.json();
  const keyName = name?.length > 0 ? name : "An unnamed key";

  const key = `sk_${generateRandomString(32)}`;
  const hint = key.slice(0, 7); // sk_zcNK...

  const id = `id_${generateRandomString(16)}`;
  const hash = Buffer.from(await createHash("SHA-256").digest(key)).toString(
    "hex",
  );

  const keyData: KeyData = {
    id,
    name: keyName,
    hint,
    created: Date.now(),
    lastUsed: Date.now(),
    status: "active",
    hash,
  };

  await kv.multi()
    .hset(`user:${user.user.id}:keys`, { [id]: keyData })
    .set(`key:${hash}`, user.user.id)
    .exec();

  return NextResponse.json({
    data: {
      ...keyData,
      key,
    },
    error: null,
  });
}

export async function DELETE(request: NextRequest) {
  const user = await authenticate(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  const keyData = await kv.hget<KeyData>(`user:${user.user.id}:keys`, id);

  if (!keyData) {
    return NextResponse.json({ error: "Key not found" }, { status: 404 });
  }

  await kv.hset(`user:${user.user.id}:keys`, {
    [id]: { ...keyData, status: "revoked" },
  });

  return NextResponse.json({ success: true });
}
