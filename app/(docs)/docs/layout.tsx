import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/ui/navbar";
import {
	Sidebar,
	SidebarHeader,
	SidebarSection,
	SidebarItem,
	SidebarLabel,
} from "@/ui/sidebar";
import { StackedLayout } from "@/ui/stacked-layout";

function DocsNavbar() {
	return (
		<Navbar>
			<NavbarSection>
				<NavbarItem href="/docs">
					<svg
						data-slot="icon"
						className="h-8 w-8"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fill="currentColor"
							d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
						/>
					</svg>
					<span className="font-semibold">Community Notes by Kayle</span>
				</NavbarItem>
				<NavbarItem href="/">Homepage</NavbarItem>
			</NavbarSection>
			<NavbarSpacer />
			<NavbarSection>
				<NavbarItem href="https://github.com/kayleai/communitynotes">
					GitHub
				</NavbarItem>
				<NavbarItem href="/sign-in">Sign In</NavbarItem>
			</NavbarSection>
		</Navbar>
	);
}

function DocsSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarSection>
					<SidebarItem href="/docs">
						<SidebarLabel>Documentation</SidebarLabel>
					</SidebarItem>
				</SidebarSection>
			</SidebarHeader>

			<SidebarSection>
				<SidebarItem href="/docs/getting-started">
					<SidebarLabel>Getting Started</SidebarLabel>
				</SidebarItem>
				<SidebarItem href="/docs/installation">
					<SidebarLabel>Installation</SidebarLabel>
				</SidebarItem>
				<SidebarItem href="/docs/concepts">
					<SidebarLabel>Basic Concepts</SidebarLabel>
				</SidebarItem>
			</SidebarSection>

			<SidebarSection>
				<SidebarItem href="/docs/features/notes">
					<SidebarLabel>Note Creation</SidebarLabel>
				</SidebarItem>
				<SidebarItem href="/docs/features/rating">
					<SidebarLabel>Rating System</SidebarLabel>
				</SidebarItem>
				<SidebarItem href="/docs/features/moderation">
					<SidebarLabel>Moderation Tools</SidebarLabel>
				</SidebarItem>
			</SidebarSection>

			<SidebarSection>
				<SidebarItem href="/docs/api/auth">
					<SidebarLabel>Authentication</SidebarLabel>
				</SidebarItem>
				<SidebarItem href="/docs/api">
					<SidebarLabel>API Endpoints</SidebarLabel>
				</SidebarItem>
				<SidebarItem href="/docs/api/limits">
					<SidebarLabel>Rate Limits</SidebarLabel>
				</SidebarItem>
			</SidebarSection>

			<SidebarSection>
				<SidebarItem href="/docs/guides/examples">
					<SidebarLabel>Integration Examples</SidebarLabel>
				</SidebarItem>
				<SidebarItem href="/docs/guides/best-practices">
					<SidebarLabel>Best Practices</SidebarLabel>
				</SidebarItem>
				<SidebarItem href="/docs/guides/troubleshooting">
					<SidebarLabel>Troubleshooting</SidebarLabel>
				</SidebarItem>
			</SidebarSection>
		</Sidebar>
	);
}

export default function DocsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<StackedLayout navbar={<DocsNavbar />} sidebar={<DocsSidebar />}>
			{children}
		</StackedLayout>
	);
}
