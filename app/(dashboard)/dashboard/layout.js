// Dashboard route group layout: DashboardShell (sidebar + top bar).
// Deliberately NO public Navbar/Footer here — separate chrome per A03.

import DashboardGuard from "@/components/dashboard/DashboardGuard";
import DashboardShell from "@/components/layout/DashboardShell";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return <DashboardGuard>
  <DashboardShell>{children}</DashboardShell>
</DashboardGuard>;
}
