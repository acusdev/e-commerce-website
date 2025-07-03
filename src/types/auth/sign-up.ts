import { z } from "zod";

export interface SignUpProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const initialSignUp: SignUpProps = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

export const signUpSchema = z
  .object({
    name: z.string().min(1, "name.required"),
    email: z.string().min(1, "email.required").email("email.invalid"),
    password: z.string().min(8, "password.required"),
    confirmPassword: z.string().min(1, "confirmPassword.required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "confirmPassword.notMatch",
  }) satisfies z.ZodType<SignUpProps>;

export type SignUpSchema = z.infer<typeof signUpSchema>;
