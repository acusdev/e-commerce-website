"use client";

import { initialSignUp, signUpSchema, SignUpSchema } from "@/types/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { LoadingSpinner } from "@/components/loading-spinner";
import Image from "next/image";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { parseAsInteger, useQueryState } from "nuqs";

const Page = () => {
  const t = useTranslations("signUpPage");
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: initialSignUp,
  });
  const [success] = useQueryState("success");
  const [timestamp] = useQueryState("timestamp", parseAsInteger.withDefault(0));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignUpSchema) => {
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          toast.success(t("success.title"), {
            description: t("success.description"),
          });
          router.push(`/sign-up?success=true&timestamp=${Math.floor(Date.now() / 1000)}`);
        },
        onError: (ctx) => {
          console.log(ctx);
          toast.error(ctx.error.message);
        },
      }
    );
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!success || !timestamp) {
      router.replace("/sign-up");
    }
    if (timestamp) {
      const now = Math.floor(Date.now() / 1000);
      const diff = now - timestamp;
      if (diff > 10) {
        router.replace("/sign-up");
      }
    }
  }, [timestamp, router, success]);

  return (
    <div className="max-w-[400px] w-full p-4 flex flex-col items-center gap-4">
      <div className="flex flex-col text-center gap-2">
        <label className="text-xl font-bold capitalize">{t("title")}</label>
        <label className="text-sm normal-case">{t("subtitle")}</label>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name.label")}</FormLabel>
                <FormControl>
                  <Input startIcon={<User className="size-4" />} placeholder={t("name.placeholder")} {...field} />
                </FormControl>
                <FormMessage enableTranslation={true} translationKey="signUpPage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email.label")}</FormLabel>
                <FormControl>
                  <Input startIcon={<Mail className="size-4" />} placeholder={t("email.placeholder")} {...field} />
                </FormControl>
                <FormMessage enableTranslation={true} translationKey="signUpPage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password.label")} </FormLabel>
                <FormControl>
                  <PasswordInput startIcon={<Lock className="size-4" />} {...field} />
                </FormControl>
                <FormMessage enableTranslation={true} translationKey="signUpPage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirmPassword.label")} </FormLabel>
                <FormControl>
                  <PasswordInput startIcon={<Lock className="size-4" />} disableVisibility={true} {...field} />
                </FormControl>
                <FormMessage enableTranslation={true} translationKey="signUpPage" />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit" className="w-full group">
            {isSubmitting ? (
              <>
                <label>{t("loading")}</label>
                <LoadingSpinner className="size-4.5" />
              </>
            ) : (
              <>
                <label>{t("credentialsCtaText")}</label>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-all" />
              </>
            )}
          </Button>
        </form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          {t("signIn.text")}{" "}
          <Link href="/sign-in" className="underline underline-offset-4 hover:text-primary">
            {t("signIn.ctaText")}
          </Link>
        </p>
        <div className="flex items-center justify-center w-full">
          <div className="h-[1px] flex-1 bg-muted-foreground"></div>
          <span className="text-sm text-muted-foreground px-2 whitespace-nowrap">{t("sublabel")}</span>
          <div className="h-[1px] flex-1 bg-muted-foreground"></div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Button disabled={isSubmitting} variant="outline" className="w-full">
            <Image src="/brands/google.svg" alt="Google" width={16} height={16} />
            <label>{t("googleCtaText")}</label>
          </Button>
          <Button disabled={isSubmitting} variant="outline" className="w-full">
            <Image src="/brands/facebook.svg" alt="Facebook" width={16} height={16} />
            <label>{t("facebookCtaText")}</label>
          </Button>
        </div>
      </Form>
      <p className="px-8 text-center text-sm text-muted-foreground">
        {t("termsAndPrivacy.text")}{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          {t("termsAndPrivacy.termsCtaText")}
        </Link>{" "}
        {t("termsAndPrivacy.and")}{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          {t("termsAndPrivacy.privacyCtaText")}
        </Link>
        .
      </p>
    </div>
  );
};

export default Page;
