"use client";

// Sonner
import { Toaster } from "sonner";

// Themes
import { ThemeProvider, useTheme } from "next-themes";

// Auth
import { AuthProvider } from "@/utils/auth/provider";

// Nuqs
import { NuqsAdapter } from "nuqs/adapters/next/app";

// Tanstack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<QueryClientProvider client={queryClient}>
			<NuqsAdapter>
				<ThemeProvider defaultTheme="system" enableSystem>
					<AuthProvider>
						<OtherProviders>{children}</OtherProviders>
					</AuthProvider>
				</ThemeProvider>
			</NuqsAdapter>
		</QueryClientProvider>
	);
}

export function OtherProviders({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { resolvedTheme } = useTheme();

	return (
		<>
			{children}
			<Toaster richColors theme={resolvedTheme === "dark" ? "dark" : "light"} />
		</>
	);
}
