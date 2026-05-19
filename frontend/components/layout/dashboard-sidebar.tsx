"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Plus,
  History,
  BarChart3,
  Search,
  ClipboardList,
  MapPin,
  Crown,
  Truck,
  Users,
  FileText,
  Settings,
  Leaf,
  ChevronLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";

const iconMap = {
  LayoutDashboard,
  Package,
  Plus,
  History,
  BarChart3,
  Search,
  ClipboardList,
  MapPin,
  Crown,
  Truck,
  Users,
  FileText,
  Settings,
};

interface NavItem {
  href: string;
  label: string;
  icon: keyof typeof iconMap;
}

const navConfig: Record<string, { label: string; items: NavItem[] }> = {
  donor: {
    label: "Donor",
    items: [
      { href: "/donor", label: "Dashboard", icon: "LayoutDashboard" },
      { href: "/donor/donations", label: "My Donations", icon: "Package" },
      { href: "/donor/add-donation", label: "Add Donation", icon: "Plus" },
      { href: "/donor/history", label: "History", icon: "History" },
      { href: "/donor/analytics", label: "Analytics", icon: "BarChart3" },
    ],
  },
  ngo: {
    label: "NGO",
    items: [
      { href: "/ngo", label: "Dashboard", icon: "LayoutDashboard" },
      { href: "/ngo/search", label: "Find Food", icon: "Search" },
      { href: "/ngo/requests", label: "My Requests", icon: "ClipboardList" },
      { href: "/ngo/track", label: "Track Delivery", icon: "MapPin" },
      { href: "/ngo/subscription", label: "Subscription", icon: "Crown" },
    ],
  },
  delivery: {
    label: "Delivery",
    items: [
      { href: "/delivery", label: "Dashboard", icon: "LayoutDashboard" },
      { href: "/delivery/tasks", label: "My Tasks", icon: "Truck" },
      { href: "/delivery/history", label: "History", icon: "History" },
    ],
  },
  admin: {
    label: "Admin",
    items: [
      { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
      { href: "/admin/users", label: "Users", icon: "Users" },
      { href: "/admin/donations", label: "Donations", icon: "Package" },
      { href: "/admin/reports", label: "Reports", icon: "FileText" },
      { href: "/admin/settings", label: "Settings", icon: "Settings" },
    ],
  },
};

interface DashboardSidebarProps {
  role: UserRole;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();

  const roleKey = role.toLowerCase().replace("_", "") as
    | "donor"
    | "ngo"
    | "delivery"
    | "admin";
  const config = navConfig[roleKey === "deliverypartner" ? "delivery" : roleKey];

  if (!config) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
              <span
              className={cn(
                "font-bold text-sidebar-foreground transition-opacity",
                state === "collapsed" && "opacity-0"
              )}
            >
              SaveBite
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{config.label} Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.items.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive =
                  pathname === item.href ||
                  (item.href !== `/${roleKey}` &&
                    pathname.startsWith(item.href));

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-start"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              state === "collapsed" && "rotate-180"
            )}
          />
          <span className={cn(state === "collapsed" && "sr-only")}>
            Collapse
          </span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
