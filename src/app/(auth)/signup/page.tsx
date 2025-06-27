"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success] = useQueryState("success");
  const [email] = useQueryState("email");
  const [timestamp] = useQueryState("timestamp", parseAsInteger.withDefault(0));

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onRequest: () => setLoading(true),
        onResponse: (ctx) => {
          console.log(ctx);
        },
        onSuccess: () => {
          toast.success("Signed up successfully!", {
            description: "Please check your email to verify your account",
          });
          router.push(`/signup?success=true&email=${data.email}&timestamp=${Math.floor(Date.now() / 1000)}`);
        },
        onError: (ctx) => {
          console.log("Sign up error:", ctx.error);
          toast.error(ctx.error.message);
        },
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    if (!success || !email || !timestamp) {
      router.replace("/signup");
    }
    if (timestamp) {
      const now = Math.floor(Date.now() / 1000);
      const diff = now - timestamp;
      if (diff > 300) {
        router.replace("/signup");
      }
    }
  }, [timestamp, router, success, email]);

  if (!success) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-md w-full p-6 rounded-xl ring ring-neutral-200 shadow-lg"
          >
            <div className="flex items-center text-center flex-col">
              <label className="text-lg font-bold">Sign up</label>
              <p className="text-sm">Create your first account now!</p>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Re-enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div>
      Success {success}; Email: {email}
    </div>
  );
};

export default Page;
