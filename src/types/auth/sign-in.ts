import { z } from "zod";

export interface SignInProps {
  email: string;
  password: string;
}

export const initialSignIn: SignInProps = {
  email: "",
  password: "",
};

export const signInSchema = z.object({
  email: z.string().min(1, "email.required").email("email.invalid"),
  password: z.string().min(1, "password.required"),
}) satisfies z.ZodType<SignInProps>;

export type SignInSchema = z.infer<typeof signInSchema>;
