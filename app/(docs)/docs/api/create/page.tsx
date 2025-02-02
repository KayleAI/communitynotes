import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function CreateEndpointPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				Create Note
			</Heading>

			<Text className="text-lg mb-8">
				Create a new community note for specific content. Notes can include
				context, fact-checking, or additional information about the content.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						Endpoint
					</Heading>
					<Card className="p-6">
						<Text className="font-mono mb-2">POST /v1/create</Text>
						<Text>Creates a new community note.</Text>
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
  "content": "string",     // Required: The note text (max 2000 chars)
  "content_id": "string",  // Required: ID of the content being annotated
  "author": {             // Optional: Author information
    "id": "string",       // Optional: External author ID
    "name": "string"      // Optional: Author name
  }
}`}</code>
						</pre>
						<Text className="text-sm text-zinc-600 dark:text-zinc-400">
							Note: The author object is optional. If not provided, the note
							will be associated with the API key‘s user.
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
  "status": "created",
  "id": "note_id"
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
									creating note
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
							<code>{`curl -X POST https://communitynotes.dev/v1/create \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "This claim needs context. According to official sources...",
    "content_id": "post_123",
    "author": {
      "id": "external_user_123",
      "name": "John Doe"
    }
  }'`}</code>
						</pre>

						<Text className="mb-4">Success Response:</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
							<code>{`{
  "status": "created",
  "id": "note_abc123"
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
