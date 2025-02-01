"use client";

// UI
import { PageHeading } from "@/ui/page-heading";
import { Subheading } from "@/ui/heading";
import { Card } from "@/ui/card";
import { Text } from "@/ui/text";

// Auth
import { useAuth } from "@/utils/auth/provider";
import { Link } from "@/ui/link";

const items = [
	{
		title: "Documentation",
		description: "View the API documentation so you can get started.",
		href: "/docs",
	},
	{
		title: "API Keys",
		description:
			"Your keys are used to authenticate your requests to the Community Notes API.",
		href: "/keys",
	},
	{
		title: "Onboarding",
		description: "See how Community Notes by Kayle works (again).",
		href: "/onboarding",
	},
	{
		title: "Help",
		description: "Get help from the Kayle team.",
		href: "/help",
	},
];

export default function Home() {
	const { user } = useAuth();

	return (
		<div>
			<PageHeading
				title={user?.name ? `Hey there, ${user.name}!` : "Hey there!"}
				description="Community Notes by Kayle is a service that allows you to add community notes to any community or platform."
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{items.map((item) => (
					<Link href={item.href} key={item.title}>
						<Card className="p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-75 ease-out">
							<Subheading>{item.title}</Subheading>
							<Text>{item.description}</Text>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
