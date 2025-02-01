"use client";

// UI
import {
	Description,
	Field,
	FieldGroup,
	Fieldset,
	Label,
	Legend,
} from "@/ui/fieldset";
import { Input, InputGroup } from "@/ui/input";
import { Text } from "@/ui/text";
import { Button } from "@/ui/button";

// Icons
import { EnvelopeIcon } from "@heroicons/react/20/solid";

// Auth
import { authClient } from "@/utils/auth/client";

// React
import { useCallback } from "react";

// Hooks
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Nuqs
import { useQueryState } from "nuqs";

export default function SignInClient() {
	const router = useRouter();
	const [email, setEmail] = useQueryState("email", {
		defaultValue: "",
	});

	const requestOtp = useCallback(async () => {
		const { error } = await authClient.emailOtp.sendVerificationOtp({
			email,
			type: "sign-in",
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success("Check your email for a magic link.");
		router.push(`/sign-in/verify?email=${email}`);
	}, [email, router]);

	return (
		<div className="h-dvh flex items-center justify-center">
			<div className="w-full max-w-md p-8 bg-white dark:bg-black shadow-lg rounded-xl">
				<Fieldset>
					<Legend>Sign in to Make Next App</Legend>
					<Text>Enter your email address to sign in.</Text>
					<FieldGroup>
						<Field>
							<Label>Email</Label>
							<Description>
								If you don‘t have an account, one will be created for you.
							</Description>
							<InputGroup>
								<EnvelopeIcon />
								<Input
									name="email"
									type="email"
									placeholder="you@example.com"
									aria-label="Email"
									className="w-full"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											requestOtp();
										}
									}}
								/>
							</InputGroup>
						</Field>
						<Field>
							<Button
								type="button"
								className="w-full py-2.5 px-4"
								color="dark/white"
								onClick={requestOtp}
							>
								Continue with Email
							</Button>
						</Field>
					</FieldGroup>
				</Fieldset>
			</div>
		</div>
	);
}
