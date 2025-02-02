import { Link } from "@/ui/link";

export function DocsLink({
	href,
	children,
	...props
}: Readonly<
	{ href: string; children: React.ReactNode } & React.ComponentProps<
		typeof Link
	>
>) {
	return (
		<Link
			href={href}
			className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
			{...props}
		>
			{children}
		</Link>
	);
}
