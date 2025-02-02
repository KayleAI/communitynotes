import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function RequestEndpointPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				Request Note
			</Heading>

			<Text className="text-lg mb-8">
				Request a community note for specific content. This is useful when you
				want to indicate that a piece of content needs additional context or
				fact-checking.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						Endpoint
					</Heading>
					<Card className="p-6">
						<Text className="font-mono mb-2">POST /v1/request</Text>
						<Text>Request a note for specific content.</Text>
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
  "content_id": "string", // Required: ID of the content to request a note for
  "context": "string"     // Optional: Additional context about why a note is needed
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
  "status": "accepted",
  "id": "request_id"
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
									creating request
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
						<Text className="mb-4">Request with context:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`curl -X POST https://communitynotes.dev/v1/request \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content_id": "post_123",
    "context": "This post makes claims about climate change that need verification"
  }'`}</code>
						</pre>

						<Text className="mb-4">Simple request:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto mb-6">
							<code>{`curl -X POST https://communitynotes.dev/v1/request \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content_id": "post_123"
  }'`}</code>
						</pre>

						<Text className="mb-4">Success Response:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
							<code>{`{
  "status": "accepted",
  "id": "request_abc123"
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
									• Multiple requests can be made for the same content
								</Text>
							</li>
							<li>
								<Text>
									• Requests help prioritize which content needs notes most
									urgently
								</Text>
							</li>
							<li>
								<Text>
									• Adding context to your request helps note writers understand
									what aspects need attention
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
								<DocsLink href="/docs/api/create">Create a note →</DocsLink>
							</li>
							<li>
								<DocsLink href="/docs/api/ai">
									Generate an AI-powered note →
								</DocsLink>
							</li>
						</ul>
					</Card>
				</section>
			</div>
		</div>
	);
}
