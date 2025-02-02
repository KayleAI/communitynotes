import { Heading } from "@/ui/heading";
import { Code, Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function AiEndpointPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				AI-Powered Note Generation
			</Heading>

			<Text className="text-lg mb-8">
				Generate community notes automatically using AI. The AI model analyzes
				the content and creates a note with relevant context and fact-checking
				information, including citations where possible.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						Endpoint
					</Heading>
					<Card className="p-6">
						<Text className="font-mono mb-2">POST /v1/ai</Text>
						<Text>Generate and create a note using AI.</Text>
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
  "content_id": "string", // Required: ID of the content to analyze
  "content": "string"     // Required: The text content to analyze (max 2000 chars)
}`}</code>
						</pre>
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
  "status": "created",
  "id": "note_id"
}

// Or when AI decides not to create a note:
{
  "status": "no_note",
  "message": "AI chose not to create a note."
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
									• <code>500 Internal Server Error</code> - Server error while
									generating note
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
						<Text className="mb-4">Request:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`curl -X POST https://communitynotes.dev/v1/ai \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content_id": "post_123",
    "content": "Global temperatures have risen by 10 degrees in the last year..."
  }'`}</code>
						</pre>

						<Text className="mb-4">Success Response (Note Created):</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`{
  "status": "created",
  "id": "note_abc123"
}`}</code>
						</pre>

						<Text className="mb-4">Success Response (No Note Needed):</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
							<code>{`{
  "status": "no_note",
  "message": "AI chose not to create a note."
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
									• The AI model will analyze the content and decide whether a
									note is needed
								</Text>
							</li>
							<li>
								<Text>
									• If created, notes will include citations to support factual
									claims
								</Text>
							</li>
							<li>
								<Text>
									• AI-generated notes are marked with{" "}
									<Code>Perplexity AI</Code> as the author
								</Text>
							</li>
							<li>
								<Text>
									• Notes can still be voted on and will affect the content‘s
									credibility score
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
								<DocsLink href="/docs/api/create">
									Create a note manually →
								</DocsLink>
							</li>
							<li>
								<DocsLink href="/docs/api/get">Get note details →</DocsLink>
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
