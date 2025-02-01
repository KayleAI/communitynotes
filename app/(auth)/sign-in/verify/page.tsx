// React
import { Suspense } from "react";

// Components
import VerifyClient from "./page.client";

export default function Verify() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyClient />
		</Suspense>
	);
}
