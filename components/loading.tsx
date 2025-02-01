import { Heading } from "@/ui/heading";
import { Text } from "@/ui/text";
import { cn } from "@/utils/cn";

export function LoaderIcon({
	className,
}: Readonly<{
	readonly className?: string;
}>) {
	return (
		<svg
			className={cn("animate-spin", className)}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<title>{/* noop */}</title>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);
}

export function Loading() {
	return (
		<main className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
			<div className="max-w-xs mx-auto border border-zinc-950/10 dark:border-white/10 px-4 py-6 rounded-lg w-full">
				<Heading>Loading</Heading>
				<Text>Please wait while we load the page.</Text>
				<div className="flex items-center justify-center w-full h-28">
					<LoaderIcon className="size-12 animate-spin text-black dark:text-white" />
				</div>
			</div>
			<footer className="absolute bottom-0 w-full h-16 flex items-center justify-center text-center">
				<Text>We‘re making sure everything is ready for you.</Text>
			</footer>
		</main>
	);
}
