"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { useAuth } from "@/lib/hooks/use-auth";
import type { UserRole } from "@/lib/types";
import { PageLoadingSkeleton } from "@/components/shared/loading-skeleton";

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function DashboardLayout({ children, allowedRoles }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user && !allowedRoles.includes(user.role)) {
        // Redirect to correct dashboard based on role
        switch (user.role) {
          case "ADMIN":
            router.push("/admin");
            break;
          case "DONOR":
            router.push("/donor");
            break;
          case "NGO":
            router.push("/ngo");
            break;
          case "DELIVERY_PARTNER":
            router.push("/delivery");
            break;
        }
      } else {
        setIsChecking(false);
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-background">
        <PageLoadingSkeleton />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar role={user.role} />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
