import { z } from "zod";

// Schema for voting on a community note
export const voteSchema = z.object({
  note_id: z.string().min(1).optional(), // The internal ID of the note
  content_id: z.string().min(1).optional(), // The external ID of the content this note is for
  vote: z.enum(["helpful", "not_helpful"]), // vote on the note
  external_id: z.string().optional(), // ID of the user who is voting
}).refine(
  (data) => (data.note_id != null) !== (data.content_id != null),
  { message: "Exactly one of note_id or content_id must be provided" },
);
export type VoteInput = z.infer<typeof voteSchema>;

// Schema for requesting a community note
export const requestSchema = z.object({
  content_id: z.string().min(1), // ID of the content to request a note for
  context: z.string().optional(), // Optional context about why a note is needed
});
export type RequestInput = z.infer<typeof requestSchema>;

// Schema for creating a community note
export const createSchema = z.object({
  context: z.string().min(1).max(2000), // this is the content of the note
  content_id: z.string().min(1),
  author: z.object({
    id: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
  }).optional().nullable(),
});
export type CreateInput = z.infer<typeof createSchema>;
