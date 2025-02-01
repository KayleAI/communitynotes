import { Navigation } from "@/components/layout/navigation";
import AuthCheckpoint from "@/utils/auth/checkpoint";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthCheckpoint ifUnauthenticated="/">
			<Navigation>{children}</Navigation>
		</AuthCheckpoint>
	);
}
