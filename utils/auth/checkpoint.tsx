"use client";

import { useEffect } from "react";
import { useAuth } from "./provider";
import { useRouter } from "next/navigation";
import {
	AuthCheckpointRedirecting,
	AuthCheckpointLoading,
} from "@/components/auth/checkpoint";

export default function AuthCheckpoint({
	children,
	ifAuthenticated,
	ifUnauthenticated,
}: {
	readonly children: React.ReactNode;
	readonly ifAuthenticated?: string;
	readonly ifUnauthenticated?: string;
}) {
	const router = useRouter();
	const { status } = useAuth();

	useEffect(() => {
		if (status === "pending") return;

		if (status === "authenticated") {
			if (ifAuthenticated) router.push(ifAuthenticated);
		}

		if (status === "unauthenticated") {
			if (ifUnauthenticated) router.push(ifUnauthenticated);
		}
	}, [status, ifAuthenticated, ifUnauthenticated, router]);

	if (status === "pending") return <AuthCheckpointLoading />;

	if (status === "authenticated" && ifAuthenticated) {
		return <AuthCheckpointRedirecting />;
	}

	if (status === "unauthenticated" && ifUnauthenticated) {
		return <AuthCheckpointRedirecting />;
	}

	return children;
}
