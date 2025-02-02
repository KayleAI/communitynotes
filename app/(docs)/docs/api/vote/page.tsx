import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function VoteEndpointPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				Vote on Note
			</Heading>

			<Text className="text-lg mb-8">
				Vote on a community note to indicate whether it was helpful or not
				helpful. Votes help determine the visibility and credibility of notes.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						Endpoint
					</Heading>
					<Card className="p-6">
						<Text className="font-mono mb-2">POST /v1/vote</Text>
						<Text>Submit a vote for a specific note.</Text>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Request Body
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">
							The request body should be a JSON object with the following
							properties:
						</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-4">
							<code>{`{
  "note_id": "string",    // Required*: The internal ID of the note
  "content_id": "string", // Required*: The external ID of the content
  "vote": "helpful" | "not_helpful", // Required: Your vote
  "external_id": "string" // Optional: External user ID for the voter
}

* Either note_id or content_id must be provided, but not both`}</code>
						</pre>
						<Text className="text-sm text-zinc-600 dark:text-zinc-400">
							Note: If content_id is provided instead of note_id, the system
							will find the associated note automatically.
						</Text>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Response
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">Success Response (200 OK):</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`{
  "status": "accepted",
  "id": "vote_id"
}`}</code>
						</pre>

						<Text className="mb-4">Error Responses:</Text>
						<ul className="space-y-3">
							<li>
								<Text>
									• <code>400 Bad Request</code> - Invalid input data
								</Text>
							</li>
							<li>
								<Text>
									• <code>401 Unauthorized</code> - Invalid or missing API key
								</Text>
							</li>
							<li>
								<Text>
									• <code>404 Not Found</code> - Note not found
								</Text>
							</li>
							<li>
								<Text>
									• <code>500 Internal Server Error</code> - Server error while
									processing vote
								</Text>
							</li>
						</ul>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Example
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">Vote using note ID:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`curl -X POST https://communitynotes.dev/v1/vote \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "note_id": "note_abc123",
    "vote": "helpful",
    "external_id": "voter_123"
  }'`}</code>
						</pre>

						<Text className="mb-4">Vote using content ID:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`curl -X POST https://communitynotes.dev/v1/vote \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content_id": "post_123",
    "vote": "not_helpful",
    "external_id": "voter_123"
  }'`}</code>
						</pre>

						<Text className="mb-4">Success Response:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
							<code>{`{
  "status": "accepted",
  "id": "vote_xyz789"
}`}</code>
						</pre>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Notes
					</Heading>
					<Card className="p-6">
						<ul className="space-y-3">
							<li>
								<Text>
									• Votes can be updated by submitting a new vote for the same
									note and external_id
								</Text>
							</li>
							<li>
								<Text>
									• The same external_id cannot vote on the same note multiple
									times (last vote counts)
								</Text>
							</li>
							<li>
								<Text>
									• Vote counts affect the note‘s visibility and credibility
									score
								</Text>
							</li>
						</ul>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						See Also
					</Heading>
					<Card className="p-6">
						<ul className="space-y-3">
							<li>
								<DocsLink href="/docs/api/get">Get note details →</DocsLink>
							</li>
							<li>
								<DocsLink href="/docs/api/create">Create a note →</DocsLink>
							</li>
						</ul>
					</Card>
				</section>
			</div>
		</div>
	);
}
