import { cn } from "@/utils/cn";

export function Card({
	children,
	className = "",
}: Readonly<{ children: React.ReactNode; className?: string }>) {
	return (
		<div
			className={cn(
				"bg-white dark:bg-black shadow-lg rounded-xl border border-zinc-950/10 dark:border-white/10",
				className,
			)}
		>
			{children}
		</div>
	);
}
