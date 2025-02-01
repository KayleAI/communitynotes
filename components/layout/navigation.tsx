"use client";

// React
import { useCallback } from "react";

// Next
import { usePathname, useRouter } from "next/navigation";

// UI
import { Avatar } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import {
	Dropdown,
	DropdownButton,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownMenu,
} from "@/ui/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/ui/navbar";
import {
	Sidebar,
	SidebarBody,
	SidebarFooter,
	SidebarHeader,
	SidebarHeading,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
	SidebarSpacer,
} from "@/ui/sidebar";

// Icons
import {
	ArrowRightStartOnRectangleIcon,
	ChevronUpIcon,
	Cog8ToothIcon,
	LightBulbIcon,
	ShieldCheckIcon,
} from "@heroicons/react/16/solid";
import {
	HomeIcon,
	QuestionMarkCircleIcon,
	SparklesIcon,
	MoonIcon,
	SunIcon,
} from "@heroicons/react/20/solid";

// Hooks
import { useAuth } from "@/utils/auth/provider";
import { useHotkeys } from "@mantine/hooks";
import { useTheme } from "next-themes";
import { StackedLayout } from "@/ui/stacked-layout";

export function Navigation({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const { resolvedTheme, setTheme } = useTheme();

	const toggleTheme = useCallback(() => {
		const newTheme = resolvedTheme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		console.warn("newTheme", newTheme);
	}, [resolvedTheme, setTheme]);

	const switchToHome = useCallback(() => {
		router.push("/home");
	}, [router]);

	useHotkeys([["d", switchToHome]]);

	return (
		<StackedLayout
			navbar={
				<Navbar>
					<NavbarSpacer />
					<NavbarSection>
						<Dropdown>
							<DropdownButton as={NavbarItem}>
								<Avatar
									src={user?.avatar ?? undefined}
									className="size-10"
									initials={!user?.avatar ? "A" : undefined}
									square
								/>
							</DropdownButton>
							<DropdownMenu className="min-w-64" anchor="bottom end">
								<DropdownItem href="/settings">
									<Cog8ToothIcon />
									<DropdownLabel>Settings</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/privacy">
									<ShieldCheckIcon />
									<DropdownLabel>Privacy policy</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="/feedback">
									<LightBulbIcon />
									<DropdownLabel>Share feedback</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/sign-out">
									<ArrowRightStartOnRectangleIcon />
									<DropdownLabel>Sign out</DropdownLabel>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarSection>
				</Navbar>
			}
			sidebar={
				<Sidebar>
					<SidebarHeader>
						<SidebarSection>
							<SidebarItem href="/home">
								<SidebarLabel>CommunityNotes.dev</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
					</SidebarHeader>
					<SidebarBody>
						<SidebarSection>
							<SidebarItem href="/home" current={pathname === "/home"}>
								<HomeIcon />
								<SidebarLabel className="flex items-center justify-between w-full">
									Home
									<Badge>H</Badge>
								</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
						<SidebarSection className="max-lg:hidden">
							<SidebarHeading>Recent</SidebarHeading>
							<SidebarItem>hello</SidebarItem>
						</SidebarSection>
						<SidebarSpacer />
						<SidebarSection>
							<SidebarItem href="/support" current={pathname === "/support"}>
								<QuestionMarkCircleIcon />
								<SidebarLabel>Support</SidebarLabel>
							</SidebarItem>
							<SidebarItem
								href="/changelog"
								current={pathname === "/changelog"}
							>
								<SparklesIcon />
								<SidebarLabel>Changelog</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
					</SidebarBody>
					<SidebarFooter className="max-lg:hidden">
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<span className="flex min-w-0 items-center gap-3">
									<Avatar
										src={user?.avatar ?? undefined}
										className="size-10"
										initials={
											!user?.avatar ? user?.name?.[0]?.toUpperCase() : undefined
										}
										square
										alt=""
									/>
									<span className="min-w-0">
										<span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
											{user?.name ?? "Me"}
										</span>
										<span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
											{user?.email}
										</span>
									</span>
								</span>
								<ChevronUpIcon />
							</DropdownButton>
							<DropdownMenu className="min-w-64" anchor="top start">
								<DropdownItem href="/settings">
									<Cog8ToothIcon />
									<DropdownLabel>Settings</DropdownLabel>
								</DropdownItem>
								<DropdownItem onClick={toggleTheme}>
									{resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
									<DropdownLabel>Toggle Theme</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/privacy">
									<ShieldCheckIcon />
									<DropdownLabel>Privacy policy</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="/feedback">
									<LightBulbIcon />
									<DropdownLabel>Share feedback</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/sign-out">
									<ArrowRightStartOnRectangleIcon />
									<DropdownLabel>Sign out</DropdownLabel>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</SidebarFooter>
				</Sidebar>
			}
		>
			{children}
		</StackedLayout>
	);
}
