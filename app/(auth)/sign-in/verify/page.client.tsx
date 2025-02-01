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
import { HashtagIcon } from "@heroicons/react/20/solid";

// React
import { useCallback, useState } from "react";

// Hooks
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Auth
import { authClient } from "@/utils/auth/client";

// Nuqs
import { useQueryState } from "nuqs";

export default function VerifyClient() {
	const router = useRouter();
	const [email] = useQueryState("email", {
		defaultValue: "",
	});
	const [otp, setOtp] = useState("");

	const handleSubmit = useCallback(async () => {
		const { error } = await authClient.signIn.emailOtp({
			otp,
			email,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success("Signed in successfully");
		router.push("/home");
	}, [email, otp, router]);

	return (
		<div className="h-dvh flex items-center justify-center">
			<div className="w-full max-w-md p-8 bg-white dark:bg-black shadow-lg rounded-xl border border-zinc-950/10 dark:border-white/10">
				<Fieldset>
					<Legend>Check your email</Legend>
					<Text>We‘ve sent you an email with a verification code.</Text>
					<FieldGroup>
						<Field>
							<Label>Verification Code</Label>
							<Description>
								Enter the 6-digit code sent to your email address.
							</Description>
							<InputGroup>
								<HashtagIcon />
								<Input
									name="code"
									type="text"
									placeholder="000000"
									aria-label="Verification code"
									className="w-full"
									maxLength={6}
									pattern="[0-9]*"
									inputMode="numeric"
									autoComplete="one-time-code"
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
								/>
							</InputGroup>
						</Field>
						<Field>
							<Button
								type="submit"
								className="w-full py-2.5 px-4"
								color="dark/white"
								onClick={handleSubmit}
							>
								Verify Code
							</Button>
						</Field>
					</FieldGroup>
				</Fieldset>
			</div>
		</div>
	);
}
