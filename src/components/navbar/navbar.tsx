"use server";

import { ShoppingBag, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import LanguageDropdown from "@/components/dropdown/language-dropdown";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDropdown from "@/components/dropdown/user-dropdown";

export default async function Navbar() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="sticky top-0 z-50 border-b border-neutral-200">
      <div className="flex items-center bg-background justify-between container px-4 mx-auto h-14 relative">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            <label className="font-semibold text-lg">Acus&apos;s Shop</label>
          </Link>
          <Separator orientation="vertical" className="ml-6 mr-2 bg-neutral-400 data-[orientation=vertical]:h-6" />
          <div className="flex items-center translate-y-0.5">
            <Link
              href="/collections"
              className={buttonVariants({
                variant: "link",
              })}
            >
              <label>Collections</label>
            </Link>
            <Link
              href="/products"
              className={buttonVariants({
                variant: "link",
              })}
            >
              <label>Furnitures</label>
            </Link>
            <Link
              href="/stores"
              className={buttonVariants({
                variant: "link",
              })}
            >
              <label>Stores</label>
            </Link>
            <Link
              href="/products"
              className={buttonVariants({
                variant: "link",
              })}
            >
              <label>About</label>
            </Link>
            <Link
              href="/products"
              className={buttonVariants({
                variant: "link",
              })}
            >
              <label>News</label>
            </Link>
            <Link
              href="/products"
              className={buttonVariants({
                variant: "link",
              })}
            >
              <label>Contacts</label>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageDropdown type="navbar" />
          <Link href="/cart" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ShoppingCart className="size-4.5 stroke-1.5" />
          </Link>
          {data?.session ? (
            <UserDropdown user={data.user} />
          ) : (
            <Link href="/sign-in" className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <UserRound className="size-4.5 stroke-1.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
