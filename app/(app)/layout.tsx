import { Navigation } from "@/components/layout/navigation";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Navigation>{children}</Navigation>;
}
