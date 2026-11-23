// Dashboard route group layout: DashboardShell (sidebar + top bar).
// Deliberately NO public Navbar/Footer here — separate chrome per A03.

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardGuard from "@/components/dashboard/DashboardGuard";
import DashboardShell from "@/components/layout/DashboardShell";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Dashboard",
};

// Auth checks require request headers/cookies; allow blocking render.
export const instant = false;

export default async function DashboardLayout({ children }) {
  // Server-side defense in depth: proxy.js is the first gate, but this layout
  // must never render protected dashboard chrome without a verified session.
  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch {
    session = null;
  }

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <DashboardGuard>
      <DashboardShell>{children}</DashboardShell>
    </DashboardGuard>
  );
}
