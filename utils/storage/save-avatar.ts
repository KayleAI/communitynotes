"use client";

/**
 * Saves an avatar to storage and returns the URL.
 *
 * @param avatar - The avatar to save.
 * @returns The URL of the saved avatar.
 */
export async function saveAvatar(
	avatar: File,
	userId: string,
): Promise<string | null> {
	const { image_url, error } = await new Promise<{
		image_url: string;
		error: Error | null;
	}>((resolve) => {
		console.warn(`Storing avatar for user ${userId}`);
		// TODO: Save avatar to storage
	});

	if (error) return null;

	return image_url;
}
