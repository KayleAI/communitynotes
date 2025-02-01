// UI
import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Divider } from "@/ui/divider";
import { Subheading } from "@/ui/heading";
import { PageHeading } from "@/ui/page-heading";
import { Strong, Text } from "@/ui/text";
import { cn } from "@/utils/cn";

// Icons
import {
	SparklesIcon,
	HeartIcon,
	ArrowPathIcon,
	ChatBubbleLeftIcon,
	BookmarkIcon,
	LightBulbIcon,
} from "@heroicons/react/20/solid";

// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "How Community Notes works",
	description: "Welcome to Community Notes! Here's how it works.",
};

interface CommunityNote {
	content: string;
	rank: "helpful" | "not_helpful";
}

export default function Onboarding() {
	return (
		<div className="max-w-xl mx-auto">
			<PageHeading
				title="How Community Notes works"
				description="Welcome to Community Notes by Kayle! Here's how it works."
			/>
			<main className="flex flex-col gap-6 mt-6">
				<div className="flex flex-col gap-6">
					<Card className="p-4 flex flex-row gap-4">
						<div className="flex items-center justify-center bg-zinc-950/10 dark:bg-white/10 rounded-xl p-4 aspect-square h-fit">
							<SparklesIcon className="size-6 aspect-square" />
						</div>
						<div className="flex flex-col">
							<Subheading>Take a look at this post</Subheading>
							<Text>
								Arsen is hiring at Kayle! However...{" "}
								<Strong>this isn‘t from Arsen.</Strong>
							</Text>
							<Text>
								It‘s actually from a <Strong>parody account</Strong>.
							</Text>
						</div>
					</Card>

					<SamplePost />
				</div>

				<div className="flex flex-col gap-6">
					<Card className="p-4 flex flex-row gap-4">
						<div className="flex items-center justify-center bg-zinc-950/10 dark:bg-white/10 rounded-xl p-4 aspect-square h-fit">
							<SparklesIcon className="size-6 aspect-square" />
						</div>
						<div className="flex flex-col">
							<Subheading>This is where community notes come in</Subheading>
							<Text>
								Community notes are a way to help people understand the{" "}
								<Strong>context and legitimacy</Strong> of the post.
							</Text>
						</div>
					</Card>
				</div>

				<div className="flex flex-col gap-6">
					<Card className="p-4 flex flex-row gap-4">
						<div className="flex items-center justify-center bg-zinc-950/10 dark:bg-white/10 rounded-xl p-4 aspect-square h-fit">
							<SparklesIcon className="size-6 aspect-square" />
						</div>
						<div className="flex flex-col">
							<Subheading>Let‘s write a note</Subheading>
							<Text>Community notes are written by people like you.</Text>
						</div>
					</Card>

					<SamplePost
						communityNote={{
							content:
								"While Kayle Inc. is hiring, this post is from a parody account not associated with Kayle Inc.",
							rank: "helpful",
						}}
					/>
				</div>

				<div className="flex flex-col gap-6">
					<Card className="p-4 flex flex-row gap-4">
						<div className="flex items-center justify-center bg-zinc-950/10 dark:bg-white/10 rounded-xl p-4 aspect-square h-fit">
							<SparklesIcon className="size-6 aspect-square" />
						</div>
						<div className="flex flex-col">
							<Subheading>Rate a note</Subheading>
							<Text>
								Community notes are rated by the people–not the author and not
								the algorithm.
							</Text>
						</div>
					</Card>
				</div>

				<div className="flex flex-col gap-6">
					<Card className="p-4 flex flex-row gap-4">
						<div className="flex items-center justify-center bg-zinc-950/10 dark:bg-white/10 rounded-xl p-4 aspect-square h-fit">
							<SparklesIcon className="size-6 aspect-square" />
						</div>
						<div className="flex flex-col">
							<Subheading>Ready to begin?</Subheading>
							<Text>Click the button below.</Text>
						</div>
					</Card>

					<Button color="dark/white" href="/home">
						I‘m ready to start!
					</Button>
				</div>

				<div className="h-[calc(20dvh)]" />
			</main>
		</div>
	);
}

/**
 * An example social media post to showcase how Community Notes works.
 */
function SamplePost({
	communityNote,
}: Readonly<{
	communityNote?: CommunityNote;
}>) {
	return (
		<Card className="p-6 flex flex-col gap-4">
			<div className="flex flex-row justify-start items-start gap-4">
				<Avatar src="https://github.com/arsenstorm.png" className="size-10" />
				<div className="flex flex-col gap-y-1 w-full">
					{/* Profile */}
					<div className="flex flex-row gap-x-1">
						<Text className="!text-black dark:!text-white font-medium">
							Arsen
						</Text>
						<Text>•</Text>
						<Text>@arsenparody</Text>
						<Text>•</Text>
						<Text>2h ago</Text>
					</div>
					{/* Content */}
					<Text>I‘m hiring at Kayle!</Text>
					<Text>If you‘re interested, please reach out to me on Twitter.</Text>
					{/* Community notes */}
					{communityNote && (
						<div className="mt-2">
							<div className="flex flex-col bg-zinc-500/5 rounded-xl p-4 border border-zinc-500/20">
								<Subheading level={3}>Community notes</Subheading>
								<div className="flex flex-col gap-y-2">
									<Text>
										While Kayle Inc. is hiring, this post is from a parody
										account not associated with Kayle Inc.
									</Text>
								</div>
								<div
									className={cn(
										"flex flex-row justify-start items-center gap-x-2 mt-4 border border-current/20 bg-current/5 rounded-lg p-2",
										{
											"text-emerald-500": communityNote.rank === "helpful",
											"text-rose-700": communityNote.rank === "not_helpful",
										},
									)}
								>
									<LightBulbIcon className="size-4" />
									<Text className="!text-current">
										Currently rated as{" "}
										<Strong className="!text-current">
											{communityNote.rank === "helpful"
												? "helpful."
												: "not helpful."}
										</Strong>
									</Text>
								</div>
								<div className="grid grid-cols-2 gap-2 mt-2">
									<Button outline>Rate as helpful</Button>
									<Button outline>Rate as not helpful</Button>
								</div>
							</div>
						</div>
					)}
					<Divider className="my-4" />
					{/* Engagement */}
					<div className="flex flex-row justify-between items-center gap-x-6">
						<div className="flex flex-row justify-start items-center gap-x-6">
							<div className="flex flex-row items-center gap-x-2">
								<HeartIcon className="size-4 text-zinc-500" />
								<Text className="text-zinc-500">238</Text>
							</div>
							<div className="flex flex-row items-center gap-x-2">
								<ChatBubbleLeftIcon className="size-4 text-zinc-500" />
								<Text className="text-zinc-500">100</Text>
							</div>
						</div>
						<div className="flex flex-row justify-start items-center gap-x-4">
							<div className="flex flex-row items-center gap-x-2">
								<ArrowPathIcon className="size-4 text-zinc-500" />
								<Text className="text-zinc-500">52</Text>
							</div>
							<BookmarkIcon className="size-4 text-zinc-500" />
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
