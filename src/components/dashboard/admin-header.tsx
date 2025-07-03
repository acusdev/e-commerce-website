"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import React from "react";

const AdminHeader = () => {
  const { currentPage } = useSidebar();

  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 h-9 w-9" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        {currentPage && (
          <div className="flex items-center gap-2">
            {currentPage.icon}
            <span className="text-sm font-medium">{currentPage.title}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
