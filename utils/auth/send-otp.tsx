import { sendEmail } from "@/utils/email/send";
import OTPVerificationEmail from "@/emails/otp";

export async function sendOTP(email: string, otp: string) {
	const result = await sendEmail({
		to: email,
		subject: "Your verification code for signing in",
		react: <OTPVerificationEmail otp={otp} email={email} />,
	});

	return result;
}
