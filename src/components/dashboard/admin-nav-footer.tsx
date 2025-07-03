import AdminNavUser from "@/components/dashboard/admin-nav-user";
import { SidebarMenu } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminNavFooter() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data?.session) {
    return null;
  }

  const { user } = data;

  return (
    <SidebarMenu>
      <AdminNavUser user={user} />
    </SidebarMenu>
  );
}
