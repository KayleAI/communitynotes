import { Button } from "@/ui/button";
import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";
import { DocsLink } from "@/components/docs/link";
import { Divider } from "@/ui/divider";

export default function DocsPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			{/* Header Section */}
			<div className="text-center mb-12">
				<Badge className="mb-4">Documentation</Badge>
				<Heading level={1} className="mb-4">
					Community Notes Documentation
				</Heading>
				<Text className="text-lg mb-8">
					Learn how to integrate community-driven context and fact-checking into
					your platform
				</Text>
				<div className="flex items-center justify-center gap-4">
					<Button color="blue" href="/docs/getting-started">
						Get Started
					</Button>
					<Button outline href="/docs/api">
						API Reference
					</Button>
				</div>
			</div>

			<Divider />

			{/* Quick Links Section */}
			<div className="my-12">
				<Heading level={2} className="mb-6">
					Quick Links
				</Heading>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{quickLinks.map((section) => (
						<Card key={section.title} className="p-6">
							<Heading level={3}>{section.title}</Heading>
							<Text className="mb-4">{section.description}</Text>
							<ul className="space-y-2">
								{section.links.map((link) => (
									<li key={link.title}>
										<DocsLink
											href={link.href}
											className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
										>
											{link.title} →
										</DocsLink>
									</li>
								))}
							</ul>
						</Card>
					))}
				</div>
			</div>

			<Divider />

			{/* Features Section */}
			<div className="my-12">
				<Heading level={2} className="mb-6">
					Key Features
				</Heading>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="p-6">
						<Heading level={3}>Note Creation</Heading>
						<Text className="mb-4">
							Create and manage contextual notes on any content. Support for
							manual creation and AI-powered generation.
						</Text>
						<DocsLink
							href="/docs/api/create"
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						>
							Learn about note creation →
						</DocsLink>
					</Card>

					<Card className="p-6">
						<Heading level={3}>Voting System</Heading>
						<Text className="mb-4">
							Community-driven voting system to surface the most helpful and
							accurate information.
						</Text>
						<DocsLink
							href="/docs/api/vote"
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						>
							Explore the voting system →
						</DocsLink>
					</Card>

					<Card className="p-6">
						<Heading level={3}>AI Integration</Heading>
						<Text className="mb-4">
							Automated note generation and fact-checking powered by advanced AI
							models.
						</Text>
						<DocsLink
							href="/docs/api/ai"
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						>
							Discover AI capabilities →
						</DocsLink>
					</Card>

					<Card className="p-6">
						<Heading level={3}>Note Requests</Heading>
						<Text className="mb-4">
							Allow users to request fact-checking and additional context for
							specific content.
						</Text>
						<DocsLink
							href="/docs/api/request"
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						>
							View request system →
						</DocsLink>
					</Card>
				</div>
			</div>

			<Divider />

			{/* Integration Methods */}
			<div className="my-12">
				<Heading level={2} className="mb-6">
					Integration Methods
				</Heading>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="p-6">
						<Heading level={3}>REST API</Heading>
						<Text className="mb-4">
							Direct HTTP access to all Community Notes features. Best for
							custom implementations and non-JavaScript platforms.
						</Text>
						<DocsLink
							href="/docs/api"
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						>
							View API documentation →
						</DocsLink>
					</Card>

					<Card className="p-6">
						<Heading level={3}>Browser Extension</Heading>
						<Text className="mb-4">
							Add Community Notes to your website without any backend
							integration. Perfect for quick deployment and testing.
						</Text>
						<DocsLink
							href="/docs/extension"
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						>
							Learn about the extension →
						</DocsLink>
					</Card>
				</div>
			</div>

			<Divider />

			{/* Support Section */}
			<div className="my-12">
				<div className="text-center">
					<Heading level={2} className="mb-4">
						Need Help?
					</Heading>
					<Text className="mb-6">
						Can‘t find what you‘re looking for? We‘re here to help.
					</Text>
					<div className="flex items-center justify-center gap-4">
						<Button href="https://github.com/kayleai/communitynotes/issues">
							Open an Issue
						</Button>
						<Button outline href="/support">
							Contact Support
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

const quickLinks = [
	{
		title: "Getting Started",
		description: "Everything you need to know to get started",
		links: [
			{ title: "Quick Start Guide", href: "/docs/getting-started" },
			{ title: "Authentication", href: "/docs/api#authentication" },
			{ title: "Core Concepts", href: "/docs/concepts" },
		],
	},
	{
		title: "Core Features",
		description: "Learn about the main features and capabilities",
		links: [
			{ title: "Creating Notes", href: "/docs/api/create" },
			{ title: "Voting System", href: "/docs/api/vote" },
			{ title: "AI-Powered Notes", href: "/docs/api/ai" },
		],
	},
	{
		title: "API Reference",
		description: "Detailed API documentation and examples",
		links: [
			{ title: "Create Note", href: "/docs/api/create" },
			{ title: "Get Note", href: "/docs/api/get" },
			{ title: "Vote on Note", href: "/docs/api/vote" },
			{ title: "Request Note", href: "/docs/api/request" },
		],
	},
	{
		title: "Integration Guide",
		description: "Step-by-step tutorials and best practices",
		links: [
			{ title: "REST API Integration", href: "/docs/api" },
			{ title: "Browser Extension", href: "/docs/extension" },
		],
	},
];
