"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { User } from "@/lib/auth";
import { signOut } from "@/lib/auth-client";
import { publicRoutes } from "@/types/route";
import { Bell, LayoutDashboard, LogOut, Moon, Settings, Ticket, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserDropdownProps {
  user: User;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Đăng xuất thành công");
            const isPublicRoute = publicRoutes.includes(pathname);
            if (isPublicRoute) {
              router.refresh();
              return;
            }
            router.push("/sign-in");
          },
        },
      });
    } catch (error) {
      console.log("Sign out error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <UserRound className="size-4.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg">
        <DropdownMenuItem>
          <Link href="/profile" className="flex items-center gap-3">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="rounded-lg">{user.name}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <LayoutDashboard />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Moon />
                <label>Dark Mode</label>
              </div>
              <Switch onClick={(e) => e.stopPropagation()} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Ticket />
            Purchases & Orders
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
