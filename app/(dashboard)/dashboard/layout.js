// Dashboard route group layout: DashboardShell (sidebar + top bar).
// Deliberately NO public Navbar/Footer here — separate chrome per A03.

import DashboardShell from "@/components/layout/DashboardShell";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
