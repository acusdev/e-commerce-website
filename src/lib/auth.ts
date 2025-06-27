import { sendMail } from "@/actions/mail";
import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, oneTap, openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "E-commerce Website",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    openAPI(),
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
    oneTap(),
  ],
  advanced: {
    cookiePrefix: "aew",
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendMail({
        to: user.email,
        subject: "Verify your email address",
        html: `
          <h4>Verify your email address</h4>
          <p>Click the link below to verify your email address:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
        `,
      });
    },
  },
});

export type Session = typeof auth.$Infer.Session;
