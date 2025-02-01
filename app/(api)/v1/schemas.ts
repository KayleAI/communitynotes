import { z } from "zod";

// Schema for voting on a community note
export const voteSchema = z.object({
	id: z.string().min(1),
	vote: z.enum(["helpful", "not_helpful"]),
});
export type VoteInput = z.infer<typeof voteSchema>;

// Schema for requesting a community note
export const requestSchema = z.object({
	id: z.string().min(1), // ID of the content to request a note for
	context: z.string().optional(), // Optional context about why a note is needed
});
export type RequestInput = z.infer<typeof requestSchema>;

// Schema for creating a community note
export const createSchema = z.object({
	note: z.object({
		content: z.string().min(1).max(2000), // this is the text of the note
		contentId: z.string().min(1), // ID of the content this note is for
		rating: z.enum(["misinformation", "needs_context", "accurate"]).optional(),
	}),
});
export type CreateInput = z.infer<typeof createSchema>;
