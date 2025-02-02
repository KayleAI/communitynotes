import { Heading } from "@/ui/heading";
import { Code, Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function GetEndpointPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				Get Note
			</Heading>

			<Text className="text-lg mb-8">
				Retrieve details about a specific community note, including its content,
				author information, and voting statistics.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						Endpoint
					</Heading>
					<Card className="p-6">
						<Text className="font-mono mb-2">GET /v1/:id</Text>
						<Text>Retrieves a note by its ID or content ID.</Text>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Parameters
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">The ID parameter can be either:</Text>
						<ul className="space-y-3">
							<li>
								<Text>
									• A note‘s ID (the one you get back from creating a note)
								</Text>
							</li>
							<li>
								<Text>• The content ID the note is associated with</Text>
							</li>
						</ul>
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
  "status": "ok",
  "note": {
    "id": "string",
    "content_id": "string",
    "created_at": "timestamp",
    "context": "string",
    "author": {
      "id": "string",
      "name": "string"
    },
    "votes": {
      "helpful": number,
      "not_helpful": number,
      "total": number,
      "score": "helpful" | "not_helpful" | "not_enough_votes"
    }
  }
}`}</code>
						</pre>

						<Text className="mb-4">Note Score Calculation:</Text>
						<ul className="space-y-3 mb-6">
							<li>
								<Text>• Requires minimum 5 votes to calculate score</Text>
							</li>
							<li>
								<Text>
									• <Code>helpful</Code> if &gt;= 65% of votes are helpful
								</Text>
							</li>
							<li>
								<Text>
									• <Code>not_helpful</Code> if &lt; 65% of votes are helpful
								</Text>
							</li>
							<li>
								<Text>
									• <Code>not_enough_votes</Code> if total votes &lt; 5
								</Text>
							</li>
						</ul>

						<Text className="mb-4">Error Responses:</Text>
						<ul className="space-y-3">
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
						</ul>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Example
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">Request using note ID:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`curl https://communitynotes.dev/v1/note_abc123 \\
  -H "Authorization: Bearer your_api_key"`}</code>
						</pre>

						<Text className="mb-4">Request using content ID:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`curl https://communitynotes.dev/v1/post_123 \\
  -H "Authorization: Bearer your_api_key"`}</code>
						</pre>

						<Text className="mb-4">Success Response:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
							<code>{`{
  "status": "ok",
  "note": {
    "id": "note_abc123",
    "content_id": "post_123",
    "created_at": "2024-02-01T12:00:00Z",
    "context": "This claim needs context. According to official sources...",
    "author": {
      "id": "external_user_123",
      "name": "John Doe"
    },
    "votes": {
      "helpful": 8,
      "not_helpful": 2,
      "total": 10,
      "score": "helpful"
    }
  }
}`}</code>
						</pre>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						See Also
					</Heading>
					<Card className="p-6">
						<ul className="space-y-3">
							<li>
								<DocsLink href="/docs/api/create">Create a note →</DocsLink>
							</li>
							<li>
								<DocsLink href="/docs/api/vote">Vote on notes →</DocsLink>
							</li>
						</ul>
					</Card>
				</section>
			</div>
		</div>
	);
}
