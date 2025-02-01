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

export async function validateApiKey(request: NextRequest) {
	const authHeader = request.headers.get("authorization");
	if (!authHeader?.startsWith("Bearer ")) {
		return { error: "Invalid authorization header", data: null };
	}

	const key = authHeader.slice(7);
	const hash = Buffer.from(await createHash("SHA-256").digest(key)).toString(
		"hex",
	);

	const userId = await kv.get<string>(`key:${hash}`);
	if (!userId) {
		return { error: "Invalid API key", data: null };
	}

	const keyData = await kv.hget<KeyData>(
		`user:${userId}:keys`,
		`id_${hash.slice(0, 16)}`,
	);

	if (!keyData || keyData.status !== "active") {
		return { error: "Invalid or revoked API key", data: null };
	}

	// Update last used timestamp
	await kv.hset(`user:${userId}:keys`, {
		[`id_${hash.slice(0, 16)}`]: {
			...keyData,
			lastUsed: Date.now(),
		},
	});

	return { error: null, data: { ...keyData, userId } };
}
