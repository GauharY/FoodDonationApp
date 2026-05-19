"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="DELIVERY_PARTNER">{children}</DashboardLayout>;
}
