import {
	Html,
	Body,
	Container,
	Head,
	Heading,
	Text,
	Link,
	Preview,
	Section,
	Hr,
	Tailwind,
} from "@react-email/components";
import { Font } from "@react-email/font";
import * as React from "react";

const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export default function OTPVerificationEmail({
	otp = "000000",
	email = "john@doe.com",
}: Readonly<{
	otp: string;
	email: string;
}>) {
	const url = `${baseUrl}/sign-in/verify?email=${email}&otp=${otp}&auto=true`;

	return (
		<Html>
			<Head>
				<Font
					fontFamily="Inter"
					fallbackFontFamily="Helvetica"
					webFont={{
						url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
						format: "woff2",
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
				<Font
					fontFamily="Inter"
					fallbackFontFamily="Helvetica"
					webFont={{
						url: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
						format: "woff2",
					}}
					fontWeight={700}
					fontStyle="normal"
				/>
			</Head>
			<Preview>Your verification code for signing in</Preview>
			<Tailwind>
				<Body className="bg-zinc-100 font-[Inter,Helvetica,system-ui]">
					<Container className="mx-auto py-12 px-4 max-w-[600px]">
						<Section className="bg-white rounded-2xl shadow-lg border border-zinc-100 p-8 mx-auto">
							<Heading className="text-3xl font-bold text-zinc-900 mb-6 font-[Inter,Helvetica,system-ui] text-center">
								Make Next App
							</Heading>

							<Text className="text-zinc-600 mb-8 text-center text-lg">
								Enter this verification code to complete your sign in:
							</Text>

							<Section className="bg-zinc-50 rounded-xl py-6 px-8 border border-zinc-100">
								<Text className="text-4xl font-mono text-center tracking-[0.5em] font-bold text-zinc-900">
									{otp}
								</Text>
							</Section>

							<Text className="text-zinc-500 text-sm text-center">
								This code will expire in 5 minutes.
							</Text>

							<Hr className="my-8" />

							<Section className="text-center mb-10">
								<Link
									href={url}
									className="block max-w-full px-6 py-4 bg-zinc-900 rounded-xl text-white font-semibold no-underline shadow-smd"
								>
									Sign in automagically
								</Link>
							</Section>

							<Text className="text-zinc-500 text-sm text-center">
								If you didn‘t request this code, you can safely ignore this
								email.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
