// React
import { Suspense } from "react";

// Components
import SignInClient from "./page.client";

export default function SignIn() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SignInClient />
		</Suspense>
	);
}
