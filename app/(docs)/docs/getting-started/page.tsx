import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function GettingStartedPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				Getting Started with Community Notes
			</Heading>

			<Text className="text-lg mb-8">
				Welcome to Community Notes! This guide will help you get up and running
				with our platform in just a few minutes. Follow these steps to integrate
				community-driven content moderation into your application using our HTTP
				API.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						Prerequisites
					</Heading>
					<Card className="p-6">
						<ul className="space-y-3">
							<li>
								<Text>
									• A running web application or platform where you want to
									implement community notes
								</Text>
							</li>
							<li>
								<Text>
									• An API key (get one by{" "}
									<DocsLink href="/sign-in">signing in</DocsLink>)
								</Text>
							</li>
							<li>
								<Text>• Basic understanding of REST APIs</Text>
							</li>
						</ul>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Quick Start Steps
					</Heading>
					<div className="space-y-4">
						<Card className="p-6">
							<Heading level={3}>1. Authentication</Heading>
							<Text className="mb-4">
								All API requests require an API key passed in the Authorization
								header:
							</Text>
							<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
								<code>Authorization: Bearer YOUR_API_KEY</code>
							</pre>
						</Card>

						<Card className="p-6">
							<Heading level={3}>2. Base URL</Heading>
							<Text className="mb-4">All API endpoints are available at:</Text>
							<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
								<code>https://communitynotes.dev/v1</code>
							</pre>
						</Card>

						<Card className="p-6">
							<Heading level={3}>3. Create Your First Community Note</Heading>
							<Text className="mb-4">
								Here‘s an example of creating a community note using the HTTP
								API:
							</Text>
							<pre className="bg-zinc-950/10 dark:bg-white/10 p-4 rounded-lg overflow-x-auto">
								<code>{`curl -X POST https://communitynotes.dev/v1/create \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "This post is misleading.",
    "content_id": "unique-content-identifier"
  }'`}</code>
							</pre>
						</Card>
					</div>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Next Steps
					</Heading>
					<Card className="p-6">
						<ul className="space-y-3">
							<li>
								<DocsLink href="/docs/api">
									View the complete API reference →
								</DocsLink>
							</li>
							<li>
								<DocsLink href="/docs/concepts">
									Learn about basic concepts →
								</DocsLink>
							</li>
							<li>
								<DocsLink href="/docs/api/create">
									Explore note creation in detail →
								</DocsLink>
							</li>
						</ul>
					</Card>
				</section>
			</div>
		</div>
	);
}
