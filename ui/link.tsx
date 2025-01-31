"use client";

import * as Headless from "@headlessui/react";
import type React from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export function Link(
	props: {
		href: string;
		ref?: React.ForwardedRef<HTMLAnchorElement>;
	} & React.ComponentPropsWithoutRef<"a">,
) {
	const router = useRouter();

	return (
		<Headless.DataInteractive>
			<NextLink
				{...props}
				ref={props.ref}
				onMouseEnter={() => router.prefetch(props.href)}
			/>
		</Headless.DataInteractive>
	);
}
