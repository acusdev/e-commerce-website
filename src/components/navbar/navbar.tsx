"use client";

import React from "react";
import { Command } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import SignOutBtn from "@/components/button/sign-out-btn";

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-neutral-200 h-16 px-4 flex items-center justify-between">
      <div>
        <Command />
      </div>
      <div className="flex items-center gap-2">
        {!data?.session ? (
          <>
            <Link
              href="/signin"
              className={buttonVariants({
                variant: "link",
              })}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({
                variant: "link",
              })}
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <div>
              <label className="text-sm">{data.user.name}</label>
            </div>
            <SignOutBtn />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
