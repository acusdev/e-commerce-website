"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { getSession, signIn } from "@/lib/auth-client";
import { initialSignIn, signInSchema, SignInSchema } from "@/types/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";

const Page = () => {
  const t = useTranslations("signInPage");
  const tErrors = useTranslations("errors");
  const router = useRouter();
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: initialSignIn,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: SignInSchema) => {
    const response = await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          toast.success(t("success.description"));
        },
        onError: (ctx) => {
          toast.error(tErrors(`auth.${ctx.error.code}`));
        },
      }
    );
    if (!response.error) {
      const { data } = await getSession();
      if (data?.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-[400px] w-full p-4 flex flex-col items-center gap-4">
      <div className="flex flex-col text-center gap-2">
        <label className="text-xl font-bold capitalize">{t("title")}</label>
        <label className="text-sm normal-case">{t("subtitle")}</label>
      </div>
      <Suspense>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email.label")}</FormLabel>
                  <FormControl>
                    <Input startIcon={<Mail className="size-4" />} placeholder={t("email.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage enableTranslation={true} translationKey="signInPage" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <label>{t("password.label")}</label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-muted-foreground hover:underline hover:text-primary font-normal underline-offset-4"
                    >
                      {t("password.forgotPassword")}
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput startIcon={<Lock className="size-4" />} {...field} />
                  </FormControl>
                  <FormMessage enableTranslation={true} translationKey="signInPage" />
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
            {t("signUp.text")}{" "}
            <Link href="/sign-up" className="underline underline-offset-4 hover:text-primary">
              {t("signUp.ctaText")}
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
      </Suspense>
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
