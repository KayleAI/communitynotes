// Auth
import { betterAuth } from "better-auth";
import {
	bearer,
	emailOTP,
	jwt,
	multiSession,
	openAPI,
	twoFactor,
	username,
} from "better-auth/plugins";

// Database
import { Pool } from "pg";

// Dotenv
import dotenv from "dotenv";
import { sendOTP } from "./utils/auth/send-otp";
dotenv.config({ path: ".env.local" });

export const auth = betterAuth({
	// Config
	secret: process.env.BETTER_AUTH_SECRET,
	url: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

	// Database
	database: new Pool({
		connectionString: process.env.DATABASE_URL,
	}),

	// Schema
	account: {
		modelName: "auth_accounts",
		fields: {
			accessToken: "access_token",
			accessTokenExpiresAt: "access_token_expires_at",
			accountId: "account_id",
			createdAt: "created_at",
			idToken: "id_token",
			providerId: "provider_id",
			refreshToken: "refresh_token",
			refreshTokenExpiresAt: "refresh_token_expires_at",
			updatedAt: "updated_at",
			userId: "user_id",
		},
	},
	session: {
		modelName: "auth_sessions",
		fields: {
			createdAt: "created_at",
			expiresAt: "expires_at",
			ipAddress: "ip_address",
			updatedAt: "updated_at",
			userAgent: "user_agent",
			userId: "user_id",
		},
	},
	user: {
		modelName: "auth_users",
		fields: {
			image: "avatar",
			createdAt: "created_at",
			email: "email",
			emailVerified: "email_verified",
			updatedAt: "updated_at",
		},
	},
	verification: {
		modelName: "auth_verification",
		fields: {
			createdAt: "created_at",
			expiresAt: "expires_at",
			updatedAt: "updated_at",
		},
	},

	// Trusted origins
	trustedOrigins: [
		...(process.env.NODE_ENV === "development"
			? ["http://localhost:3000", "https://next.local"]
			: (process.env.TRUSTED_ORIGINS?.trim().replaceAll(" ", "").split(",") ??
				[])),
	],

	// Plugins
	plugins: [
		jwt({
			schema: {
				jwks: {
					modelName: "auth_jwks",
					fields: {
						createdAt: "created_at",
						publicKey: "public_key",
						privateKey: "private_key",
					},
				},
			},
		}),
		bearer(),
		username(),
		multiSession({
			maximumSessions: 5, // Limit to five sessions per device
		}),
		twoFactor({
			issuer: "Human Corners",
			schema: {
				twoFactor: {
					modelName: "auth_two_factor",
					fields: {
						backupCodes: "backup_codes",
						secret: "secret",
						userId: "user_id",
					},
				},
			},
		}),
		openAPI(),
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				console.warn("sendVerificationOTP", { email, otp, type });
				const result = await sendOTP(email, otp);
				console.warn("sendOTP result", result);
			},
		}),
	],
});
