import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function ConceptsPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				Browser Extension
			</Heading>

			<Text className="text-lg mb-8">
				We‘ve built a browser extension that allows you to create and view
				community notes on any website.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						Features
					</Heading>
					<div className="space-y-4">
						<Card className="p-6">
							<Heading level={3}>View Community Notes</Heading>
							<Text>
								See what others have noted about the content you‘re viewing.
								Notes appear directly on the webpage, providing additional
								context and insights.
							</Text>
						</Card>
						<Card className="p-6">
							<Heading level={3}>Create Notes</Heading>
							<Text>
								Add your own notes to any webpage. Simply select text and click
								the extension icon to add context, corrections, or helpful
								information.
							</Text>
						</Card>
						<Card className="p-6">
							<Heading level={3}>Vote and Interact</Heading>
							<Text>
								Rate the helpfulness of other users‘ notes and contribute to the
								community-driven moderation system.
							</Text>
						</Card>
					</div>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Installation
					</Heading>
					<Text className="mb-4">
						The extension is available for major browsers:
					</Text>
					<div className="space-y-4">
						<Card className="p-6">
							<Heading level={3}>Chrome</Heading>
							<Text>
								Our Chrome extension is available on the{" "}
								<DocsLink href="https://chrome.google.com/webstore/">
									Chrome Web Store
								</DocsLink>
								{"."}
							</Text>
						</Card>
						<Card className="p-6">
							<Heading level={3}>Firefox</Heading>
							<Text>Our Firefox extension is coming soon!</Text>
						</Card>
					</div>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Getting Started
					</Heading>
					<div className="space-y-4">
						<Card className="p-6">
							<Heading level={3}>1. View Notes</Heading>
							<Text>
								Browse any website - if there are community notes available,
								you‘ll see them highlighted on the page.
							</Text>
						</Card>
						<Card className="p-6">
							<Heading level={3}>2. Request Community Notes</Heading>
							<Text>
								If you‘re on a website that doesn‘t have community notes, you
								can request them.
							</Text>
						</Card>
						<Card className="p-6">
							<Heading level={3}>3. Create a Community Note</Heading>
							<Text>To add a note:</Text>
							<ul className="space-y-3 mt-4">
								<li>
									<Text>• Select text on any webpage</Text>
								</li>
								<li>
									<Text>
										• Click the extension icon or use the keyboard shortcut
									</Text>
								</li>
								<li>
									<Text>• Write your note and submit</Text>
								</li>
							</ul>
						</Card>
					</div>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						API Integration
					</Heading>
					<Card className="p-6">
						<Text>
							The extension uses our public API to fetch and create notes. For
							more information about the API endpoints used, see our{" "}
							<DocsLink href="/docs/api">API documentation</DocsLink>.
						</Text>
					</Card>
				</section>
			</div>
		</div>
	);
}
