import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function NgoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout allowedRoles={["NGO"]}>
      {children}
    </DashboardLayout>
  );
}
