import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "uh_oh");

if (process.env.RESEND_API_KEY === undefined) {
	console.warn("[WARN] RESEND_API_KEY is not set");
}

export interface Email {
	from?: string;
	to: string | string[];
	subject: string;
	react?: React.ReactNode;
	html?: string;
	text?: string;
}

export async function sendEmail({
	from,
	to,
	subject,
	react,
	html,
	text,
}: Readonly<Email>): Promise<string | null> {
	const { data, error } = await resend.emails.send({
		from: from ?? "Make Next App <onboarding@resend.dev>",
		to: to,
		subject: subject,
		react: react ?? undefined,
		html: html ?? undefined,
		text: text ?? undefined,
	});

	if (error) {
		console.error(error);
		return null;
	}

	return data?.id ?? null;
}
