// UI
import { PageHeading } from "@/ui/page-heading";

// Types
import type { Metadata } from "next";

// Components
import { CreateKeyButton, KeysList } from "./page.client";

export const metadata: Metadata = {
	title: "API Keys",
	description:
		"Your API keys are used to authenticate your requests to the Community Notes API.",
};

export default function KeysPage() {
	return (
		<div>
			<PageHeading
				title="API Keys"
				description="Your API keys are used to authenticate your requests to the Community Notes API."
			>
				<CreateKeyButton />
			</PageHeading>
			<KeysList />
		</div>
	);
}
