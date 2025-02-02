import { Button } from "@/ui/button";
import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { Badge } from "@/ui/badge";
import { StackedLayout } from "@/ui/stacked-layout";
import { Divider } from "@/ui/divider";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/ui/navbar";
import {
	Sidebar,
	SidebarHeader,
	SidebarSection,
	SidebarItem,
	SidebarLabel,
	SidebarFooter,
} from "@/ui/sidebar";
import { Card } from "@/ui/card";

function MarketingNavbar() {
	return (
		<Navbar>
			<NavbarSection>
				<NavbarItem href="/">
					<svg
						data-slot="icon"
						className="h-8 w-8"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<title>{/* noop */}</title>
						<path
							fill="currentColor"
							d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
						/>
					</svg>
					<span className="font-semibold">Community Notes by Kayle</span>
				</NavbarItem>
				<NavbarItem href="/docs">Docs</NavbarItem>
			</NavbarSection>
			<NavbarSpacer />
			<NavbarSection>
				<NavbarItem href="/sign-in">Sign In</NavbarItem>
			</NavbarSection>
		</Navbar>
	);
}

function MarketingSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarSection>
					<SidebarItem href="/">
						<SidebarLabel>CommunityNotes.dev</SidebarLabel>
					</SidebarItem>
				</SidebarSection>
			</SidebarHeader>
			<SidebarFooter>
				<SidebarSection>
					<SidebarItem href="https://github.com/arsenstorm">
						<svg data-slot="icon" viewBox="0 0 24 24" aria-hidden="true">
							<title>GitHub</title>
							<path
								fill="currentColor"
								d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
							/>
						</svg>
						<SidebarLabel>GitHub</SidebarLabel>
					</SidebarItem>
					<SidebarItem href="https://twitter.com/arsenstorm">
						<svg data-slot="icon" viewBox="0 0 24 24" aria-hidden="true">
							<title>Twitter</title>
							<path
								fill="currentColor"
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
						<SidebarLabel>Twitter</SidebarLabel>
					</SidebarItem>
				</SidebarSection>
			</SidebarFooter>
		</Sidebar>
	);
}

export default function MarketingPage() {
	return (
		<StackedLayout navbar={<MarketingNavbar />} sidebar={<MarketingSidebar />}>
			<div className="max-w-4xl mx-auto px-6 py-12">
				{/* Hero Section */}
				<div className="text-center mb-12">
					<Badge className="mb-4">Now in beta</Badge>
					<Heading level={1} className="mb-4">
						Community Notes by Kayle
					</Heading>
					<Text className="text-lg mb-8 max-w-2xl mx-auto text-center px-4">
						Community Notes by Kayle uses the principles of Twitter‘s Community
						Notes to provide a service to allow other communities and platforms
						to introduce a community notes feature.
					</Text>
					<div className="flex items-center justify-center gap-4">
						<Button color="blue" href="/sign-in">
							Get Started
						</Button>
						<Button outline href="https://github.com/kayleai/communitynotes">
							GitHub &rarr;
						</Button>
					</div>
				</div>

				<Divider />

				{/* Not a developer section */}
				<div className="my-12">
					<div className="text-center mb-8">
						<Heading level={2} className="mb-4">
							Not a developer?
						</Heading>
						<Text className="text-lg mb-8 max-w-2xl mx-auto text-center">
							We‘ve created an extension that allows you to add Community Notes
							to any website for personal use in the fight against
							misinformation.
						</Text>
					</div>

					<Card className="p-6">
						<Heading level={3}>Browser Extension</Heading>
						<Text className="mb-4">
							Install our browser extension to instantly add Community Notes to
							any website.
						</Text>
						<Button outline href="/extension">
							Get the Extension
						</Button>
					</Card>
				</div>

				<Divider />

				{/* Features Section */}
				<div className="my-12">
					<div className="text-center mb-8">
						<Heading level={2} className="mb-4">
							Why Choose Our Platform
						</Heading>
						<Text>
							Everything you need to implement community-driven content
							moderation
						</Text>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{features.map((feature) => (
							<Card key={feature.title} className="p-6">
								<Heading level={3}>{feature.title}</Heading>
								<Text>{feature.description}</Text>
							</Card>
						))}
					</div>
				</div>

				<Divider />

				{/* CTA Section */}
				<div className="my-12">
					<div className="text-center">
						<Badge className="mb-4">Now in beta</Badge>
						<Heading level={2} className="mb-4">
							Ready to get started?
						</Heading>
						<Text className="mb-8">
							Join forward-thinking platforms that trust their communities to
							maintain content integrity
						</Text>
						<Button color="blue" href="/sign-in">
							Start Building Today
						</Button>
					</div>
				</div>
			</div>
		</StackedLayout>
	);
}

const features = [
	{
		title: "Easy Integration",
		description: "A simple API that works with any platform or content type.",
	},
	{
		title: "Smart Rating System",
		description:
			"Advanced algorithms to surface the most helpful and accurate community contributions.",
	},
	{
		title: "Trust & Safety",
		description:
			"Built-in safeguards and moderation tools to prevent abuse and maintain quality.",
	},
	{
		title: "Real-time Updates",
		description:
			"Instant note visibility and dynamic content updates for fresh, relevant context.",
	},
	{
		title: "Engagement Analytics",
		description:
			"Comprehensive metrics to track community participation and note effectiveness.",
	},
	{
		title: "No UI",
		description:
			"How you want Community Notes to look is up to you, we just provide the service.",
	},
];
