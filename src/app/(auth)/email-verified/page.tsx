import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EmailVerifiedPage = () => {
  return (
    <div className="flex flex-col gap-2 w-fit p-4">
      <label>Email verified</label>
      <Link
        href="/"
        className={buttonVariants({
          variant: "default",
        })}
      >
        Got to home
      </Link>
    </div>
  );
};

export default EmailVerifiedPage;
