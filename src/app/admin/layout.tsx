import AdminDashboardSidebar from "@/components/dashboard/admin-dashboard-sidebar";
import AdminHeader from "@/components/dashboard/admin-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChildrenNodeProps } from "@/types/children";

const Layout = ({ children }: ChildrenNodeProps) => {
  return (
    <SidebarProvider>
      <AdminDashboardSidebar />
      <SidebarInset>
        <AdminHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
