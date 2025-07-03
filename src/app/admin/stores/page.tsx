"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Store } from "lucide-react";
import React, { useEffect } from "react";

const Page = () => {
  const { setCurrentPage } = useSidebar();

  useEffect(() => {
    setCurrentPage({
      title: "Stores",
      href: "/admin/stores",
      description: "Manage stores",
      icon: <Store className="size-4" />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="px-4">Page</div>;
};

export default Page;
