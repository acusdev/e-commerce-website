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
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
}) satisfies z.ZodType<SignInProps>;

export type SignInSchema = z.infer<typeof signInSchema>;
