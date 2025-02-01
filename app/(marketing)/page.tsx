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
					<span className="font-semibold">CommunityNotes.dev</span>
				</NavbarItem>
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
			{/* Hero Section */}
			<div className="px-6 lg:px-8 py-24 sm:py-32">
				<div className="mx-auto max-w-2xl text-center">
					<Badge className="mb-4">Now in beta</Badge>
					<Heading level={1} className="mt-4 mb-6">
						CommunityNotes.dev
					</Heading>
					<Text className="mb-8">
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
			</div>

			<Divider />

			{/* Features Section */}
			<div className="py-24 sm:py-32">
				<div className="mx-auto max-w-7xl">
					<div className="text-center mb-16">
						<Heading level={2}>Features</Heading>
						<Text className="mt-4">
							Everything you need to build modern web applications
						</Text>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="p-6 rounded-lg border border-zinc-950/10 dark:border-white/10"
							>
								<Heading level={3} className="mb-3">
									{feature.title}
								</Heading>
								<Text>{feature.description}</Text>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="py-24 sm:py-32 border border-zinc-950/10 dark:border-white/10 rounded-lg">
				<div className="mx-auto max-w-2xl text-center">
					<Heading level={2} className="mb-4">
						Ready to get started?
					</Heading>
					<Text className="mb-8">
						Join thousands of developers building better applications
					</Text>
					<Button color="blue">Start Building Today</Button>
				</div>
			</div>
		</StackedLayout>
	);
}

const features = [
	{
		title: "Modern Stack",
		description:
			"Built with Next.js, TypeScript, and Tailwind CSS for the best developer experience.",
	},
	{
		title: "UI Components",
		description:
			"Beautifully designed components that work together seamlessly.",
	},
	{
		title: "Fast & Reliable",
		description: "Optimized for performance and reliability out of the box.",
	},
];
