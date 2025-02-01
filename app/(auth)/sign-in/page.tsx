// React
import { Suspense } from "react";

// Components
import SignInClient from "./page.client";
import { Loading } from "@/components/loading";

export default function SignIn() {
	return (
		<Suspense fallback={<Loading />}>
			<SignInClient />
		</Suspense>
	);
}
