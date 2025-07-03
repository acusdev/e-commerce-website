"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { User } from "better-auth";
import { Home, LogOut } from "lucide-react";
import React from "react";

interface AdminNavUserProps {
  user: User;
}

const AdminNavUser = ({ user }: AdminNavUserProps) => {
  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Home />
          Go to home
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <LogOut />
          Sign out
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 mt-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="rounded-lg">{user.name}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </>
  );
};

export default AdminNavUser;
