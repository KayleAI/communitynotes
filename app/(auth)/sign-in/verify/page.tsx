// React
import { Suspense } from "react";

// Components
import VerifyClient from "./page.client";
import { Loading } from "@/components/loading";

export default function Verify() {
	return (
		<Suspense fallback={<Loading />}>
			<VerifyClient />
		</Suspense>
	);
}
