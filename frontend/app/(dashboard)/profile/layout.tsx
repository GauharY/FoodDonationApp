"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useAuth } from "@/lib/hooks/use-auth";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return <DashboardLayout role={user?.role || "DONOR"}>{children}</DashboardLayout>;
}
