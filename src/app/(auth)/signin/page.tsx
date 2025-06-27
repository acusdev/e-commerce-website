"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { initialSignIn, signInSchema, SignInSchema } from "@/types/auth/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Command } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: initialSignIn,
  });

  const onSubmit = (data: SignInSchema) => {
    console.log("Form submitted with data:", data);
  };

  const onErrors = (errors: FieldErrors<SignInSchema>) => {
    console.log("Form submission errors:", errors);
  };

  return (
    <div className="relative min-h-screen grid grid-cols-2">
      <div className="flex flex-col items-center justify-center relative">
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2">
            <Command />
            <label className="font-semibold text-xl">Acus&apos;s Shop</label>
          </Link>
        </div>
        <div className="max-w-[400px] w-full p-4 flex flex-col items-center gap-4">
          <div className="flex flex-col text-center gap-2">
            <label className="text-xl font-bold">Trang Đăng Nhập</label>
            <label className="text-sm">Điền thông tin để tiếp tục sử dụng dịch vụ của cửa hàng</label>
          </div>
          <Suspense>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, onErrors)} className="space-y-4 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="shop@gmail.com" {...field} />
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
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full group">
                  <label>Tiếp tục đăng nhập</label>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-all" />
                </Button>
              </form>
              <p className="px-8 text-center text-sm text-muted-foreground">
                Bạn chưa có tài khoản?{" "}
                <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                  Đăng ký ngay
                </Link>
              </p>
              <div className="flex items-center justify-center w-full">
                <div className="h-[1px] flex-1 bg-muted-foreground"></div>
                <span className="text-sm text-muted-foreground px-2 whitespace-nowrap">Hoặc đăng nhập với</span>
                <div className="h-[1px] flex-1 bg-muted-foreground"></div>
              </div>
              <Button variant="outline" className="w-full">
                <FcGoogle />
                <label>Đăng nhập với Google</label>
              </Button>
            </Form>
          </Suspense>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Bằng cách nhấn tiếp tục, bạn đồng ý với{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Chính sách quyền riêng tư
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="grow relative">
        <Image src="/images/auth-hero.png" alt="Auth hero image" objectFit="cover" fill />
      </div>
    </div>
  );
};

export default SignInPage;
