"use server";

// Utils
import { createHash } from "@better-auth/utils/hash";

// Types
import type { NextRequest } from "next/server";

// Vercel KV
import { kv } from "@vercel/kv";

export interface KeyData {
  id: string;
  name: string;
  hint: string;
  created: number;
  lastUsed: number;
  status: "active" | "revoked";
  hash: string;
}

export async function validateApiKey(request: NextRequest): Promise<{
  data: (KeyData & { userId: string }) | null;
  error: string | null;
}> {
  const apiKey = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!apiKey) {
    return { data: null, error: "API key required" };
  }

  const keyHash = Buffer.from(await createHash("SHA-256").digest(apiKey))
    .toString("hex");

  const userId = await kv.get<string>(`key:${keyHash}`);
  if (!userId) {
    return { data: null, error: "Invalid API key" };
  }

  const keys = await kv.hgetall<Record<string, KeyData>>(`user:${userId}:keys`);
  const keyData = Object.values(keys ?? {}).find((k) => k.hash === keyHash);

  if (!keyData || keyData.status === "revoked") {
    return { data: null, error: "Invalid or revoked API key" };
  }

  await kv.hset(`user:${userId}:keys`, {
    [keyData.id]: { ...keyData, lastUsed: Date.now() },
  });

  return { data: { ...keyData, userId }, error: null };
}
