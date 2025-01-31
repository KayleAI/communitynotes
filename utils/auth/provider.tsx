"use client";

// Auth
import { authClient } from "./client";

// React
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthSessionContext = {
	status: "pending" | "authenticated" | "unauthenticated";
	session: any;
	user: any;
	token: string | null;
	update: () => Promise<void>;
};

const AuthContext = createContext<AuthSessionContext>({
	status: "pending",
	session: null,
	user: null,
	token: null,
	update: async () => {},
});

export function AuthProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [status, setStatus] = useState<
		"pending" | "authenticated" | "unauthenticated"
	>("pending");
	const [user, setUser] = useState<any>(null);
	const [session, setSession] = useState<any>(null);
	const [token, setToken] = useState<string | null>(null);
	const { data, error, isPending } = authClient.useSession();

	useEffect(() => {
		if (isPending) {
			return;
		}

		if (error) {
			console.warn("[ERROR]", error);
		}

		setStatus("unauthenticated");

		if (data) {
			setUser(data.user);
			setSession(data.session);
			setToken(data.session?.token ?? null);
			setStatus("authenticated");
		}
	}, [data, error, isPending]);

	const value = useMemo(
		() => ({
			status,
			user,
			session,
			token,
			update: async () => {
				await authClient.getSession();
			},
		}),
		[status, user, session, token],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
