"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { oneTap, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          toast.success("Signed in successfully!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          console.log("Sign in error:", ctx.error);
          toast.error("Sign in failed!", {
            description: ctx.error.message ?? "Something went wrong!",
          });
        },
      }
    );
    setLoading(false);
  };

  const onGoogleSignIn = async () => {
    await signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          console.log("Sign in error:", ctx.error);
          toast.error("Sign in failed!", {
            description: ctx.error.message ?? "Something went wrong!",
          });
        },
      }
    );
  };

  useEffect(() => {
    const oneTapCall = async () => {
      await oneTap({
        callbackURL: "/",
        fetchOptions: {
          headers: {
            "Referrer-Policy": "no-referrer-when-downgrade",
          },
        },
      });
    };

    oneTapCall();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md w-full p-6 rounded-xl ring ring-neutral-200 shadow-lg"
        >
          <div className="flex items-center text-center flex-col">
            <label className="text-lg font-bold">Sign in</label>
            <p className="text-sm">Enter your credentials to sign in!</p>
          </div>
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
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <Button onClick={onGoogleSignIn} disabled={loading} variant="outline" className="w-full">
            <FcGoogle />
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
          <div className="flex items-center flex-col text-center">
            <Link
              href="/forgot-password"
              className={buttonVariants({
                variant: "link",
              })}
            >
              Forgot password
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
