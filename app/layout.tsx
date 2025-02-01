// Next
import type { Metadata } from "next";

// Styles
import "@/styles/globals.css";
import clsx from "clsx";

// Providers
import Providers from "./providers";

export const metadata: Metadata = {
	title: {
		template: "%s - Community Notes",
		default: "Community Notes by Kayle",
	},
	description:
		"Easily implement Community Notes in your community. Powered by Kayle.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950"
		>
			<body className={clsx("antialiased")}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
