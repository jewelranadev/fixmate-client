import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { dashboardFor } from "@/lib/auth-helpers";

// Auth checks require request headers/cookies; allow blocking render.
export const instant = false;

export default async function CustomerDashboardLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  const user = session?.user;
  if (!user) redirect("/sign-in");
  if (user.role !== "customer") redirect(dashboardFor(user.role));
  return children;
}
