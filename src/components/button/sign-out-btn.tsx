"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutBtn = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin");
          },
        },
      });
    } catch (error) {
      console.log("Sign out error:", error);
    }
  };

  return (
    <Button variant="link" onClick={handleSignOut}>
      Sign out
    </Button>
  );
};

export default SignOutBtn;
