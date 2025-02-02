import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";

export default function ConceptsPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<Heading level={1} className="mb-6">
				Core Concepts
			</Heading>

			<Text className="text-lg mb-8">
				Understanding the fundamental concepts behind Community Notes and how
				they work to provide reliable, community-driven context and
				fact-checking.
			</Text>

			<div className="space-y-8">
				<section>
					<Heading level={2} className="mb-4">
						What are Community Notes?
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">
							Community Notes are contextual annotations that provide additional
							information, fact-checking, or important context to any piece of
							content. They are:
						</Text>
						<ul className="space-y-3">
							<li>
								<Text>
									• <strong>Community-driven:</strong> Created and curated by
									users
								</Text>
							</li>
							<li>
								<Text>
									• <strong>Transparent:</strong> Open for everyone to see and
									verify
								</Text>
							</li>
							<li>
								<Text>
									• <strong>Dynamic:</strong> Can be updated as new information
									becomes available
								</Text>
							</li>
							<li>
								<Text>
									• <strong>Collaborative:</strong> Improved through community
									voting and feedback
								</Text>
							</li>
						</ul>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Note Creation Process
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">Notes can be created in several ways:</Text>
						<ul className="space-y-3">
							<li>
								<Text>
									• <strong>Manual Creation:</strong> Users write notes directly
								</Text>
							</li>
							<li>
								<Text>
									• <strong>AI-Assisted:</strong> Generated with AI help and
									human review
								</Text>
							</li>
							<li>
								<Text>
									• <strong>Community Requests:</strong> Created in response to
									user requests
								</Text>
							</li>
						</ul>
						<Text className="mt-4">
							All notes go through a review process to ensure quality and
							accuracy before being published.
						</Text>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Voting System
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">
							The voting system helps surface the most helpful and accurate
							notes:
						</Text>
						<ul className="space-y-3">
							<li>
								<Text>
									• Notes receive upvotes for helpfulness and accuracy
								</Text>
							</li>
							<li>
								<Text>• Community feedback helps improve note quality</Text>
							</li>
							<li>
								<Text>
									• Voting history influences note visibility and ranking
								</Text>
							</li>
							<li>
								<Text>• Anti-abuse measures prevent manipulation</Text>
							</li>
						</ul>
					</Card>
				</section>

				<section>
					<Heading level={2} className="mb-4">
						Note Quality Guidelines
					</Heading>
					<Card className="p-6">
						<Text className="mb-4">High-quality notes should be:</Text>
						<ul className="space-y-3">
							<li>
								<Text>
									• <strong>Accurate:</strong> Based on reliable sources
								</Text>
							</li>
							<li>
								<Text>
									• <strong>Neutral:</strong> Present facts without bias
								</Text>
							</li>
							<li>
								<Text>
									• <strong>Clear:</strong> Written in simple, understandable
									language
								</Text>
							</li>
							<li>
								<Text>
									• <strong>Relevant:</strong> Directly address the content‘s
									claims
								</Text>
							</li>
							<li>
								<Text>
									• <strong>Verifiable:</strong> Include citations and sources
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
								<DocsLink href="/docs/getting-started">
									Getting Started Guide →
								</DocsLink>
							</li>
							<li>
								<DocsLink href="/docs/api/create">Creating Notes →</DocsLink>
							</li>
							<li>
								<DocsLink href="/docs/api/vote">Voting System →</DocsLink>
							</li>
						</ul>
					</Card>
				</section>
			</div>
		</div>
	);
}
