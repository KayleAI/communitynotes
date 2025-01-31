"use client";

// Utils
import clsx from "clsx";

// UI
import { Heading, Subheading } from "./heading";
import { Text } from "./text";

export function PageHeading({
	className,
	title = "Heading",
	description = "",
	children,
	...props
}: Readonly<{
	title?: string;
	description?: string;
	children?: React.ReactNode;
	className?: string;
}>) {
	return (
		<div
			{...props}
			className={clsx(
				className,
				"flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10",
			)}
		>
			<div className="flex flex-col">
				<Heading>{title}</Heading>
				<Text>{description}</Text>
			</div>
			<div className="flex gap-4">{children}</div>
		</div>
	);
}

export function PageSubHeading({
	className,
	title = "Heading",
	level = 2,
	description = "",
	children,
	...props
}: Readonly<{
	title?: string;
	description?: string;
	level?: 2 | 3;
	children?: React.ReactNode;
	className?: string;
}>) {
	return (
		<div
			{...props}
			className={clsx(
				className,
				"flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10",
			)}
		>
			<div className="flex flex-col gap-2">
				<Subheading level={level}>{title}</Subheading>
				<Text>{description}</Text>
			</div>
			<div className="flex gap-4">{children}</div>
		</div>
	);
}
