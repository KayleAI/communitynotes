import { PageHeading } from "@/ui/page-heading";
import SettingsClient from "./page.client";

export default function Settings() {
	return (
		<div>
			<PageHeading
				title="Settings"
				description="This is where you can manage your account settings."
			/>
			<SettingsClient />
		</div>
	);
}
