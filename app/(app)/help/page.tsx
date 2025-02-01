// UI
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Subheading } from "@/ui/heading";
import { PageHeading } from "@/ui/page-heading";
import { Text, TextLink } from "@/ui/text";

export default function HelpPage() {
	return (
		<div>
			<PageHeading
				title="Help with Community Notes"
				description="Looking for help? You‘re in the right place."
			>
				<Button href="mailto:help@kayle.ai" color="dark/white">
					Contact Support
				</Button>
			</PageHeading>

			<div className="mt-6 flex flex-col gap-4">
				<Card className="p-4">
					<Subheading>Looking for API documentation?</Subheading>
					<Text>
						You can find the API documentation{" "}
						<TextLink href="/docs">here</TextLink>.
					</Text>
				</Card>

				<Card className="p-4">
					<Subheading>Running into API issues?</Subheading>
					<Text>
						Contacting us is probably the best way to get help. You can contact
						us at <TextLink href="mailto:help@kayle.ai">help@kayle.ai</TextLink>
						.
					</Text>
				</Card>
			</div>
		</div>
	);
}
