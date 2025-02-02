import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function ApiReferencePage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				API Reference
			</Heading>

			<Text className="text-lg mb-8">
				Complete reference for the Community Notes API. All API endpoints
				require authentication using an API key. Learn how to obtain and use API
				keys in our{" "}
				<DocsLink href="/docs/getting-started">Getting Started</DocsLink> guide.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						Authentication
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">
							All API requests must include your API key in the Authorization
							header:
						</Text>
						<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
							<code>Authorization: Bearer your_api_key_here</code>
						</pre>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Available Endpoints
					</Heading>
					<div className="space-y-4">
						<Card className="p-6">
							<Heading level={3}>Notes</Heading>
							<ul className="space-y-3">
								<li>
									<DocsLink href="/docs/api/create">
										POST /v1/create - Create a new note →
									</DocsLink>
								</li>
								<li>
									<DocsLink href="/docs/api/get">
										GET /v1/[id] - Get note details →
									</DocsLink>
								</li>
								<li>
									<DocsLink href="/docs/api/vote">
										POST /v1/vote - Vote on a note →
									</DocsLink>
								</li>
								<li>
									<DocsLink href="/docs/api/request">
										POST /v1/request - Request a note for content →
									</DocsLink>
								</li>
								<li>
									<DocsLink href="/docs/api/ai">
										POST /v1/ai - Generate an AI-powered note →
									</DocsLink>
								</li>
							</ul>
						</Card>
					</div>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Response Format
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">
							All API endpoints return JSON responses with a consistent format:
						</Text>
						<ul className="space-y-3">
							<li>
								<Text>
									• Success responses include a <code>status</code> field and
									relevant data
								</Text>
							</li>
							<li>
								<Text>
									• Error responses include an <code>error</code> field with a
									description
								</Text>
							</li>
							<li>
								<Text>
									• HTTP status codes are used appropriately (200 for success,
									4xx for client errors, 5xx for server errors)
								</Text>
							</li>
						</ul>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Rate Limits
					</Heading>
					<Card className="p-6">
						<Text>
							Rate limits may apply to API endpoints. Contact us for details
							about rate limits for your specific use case.
						</Text>
					</Card>
				</section>
			</div>
		</div>
	);
}
