import AdminNavFooter from "@/components/dashboard/admin-nav-footer";
import AdminNavMain from "@/components/dashboard/admin-nav-main";
import AdminNavOthers from "@/components/dashboard/admin-nav-other";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminDashboardSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-start gap-2 flex-1">
          <ShoppingBag className="size-5" />
          <div className="grid gap-1 text-left leading-tight">
            <label className="truncate font-semibold">Acus&apos;s Shop</label>
            <label className="truncate text-xs">Admin dashboard</label>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain />
        <AdminNavOthers />
      </SidebarContent>
      <SidebarFooter>
        <AdminNavFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminDashboardSidebar;
