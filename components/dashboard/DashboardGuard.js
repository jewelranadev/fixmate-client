"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { dashboardFor } from "@/lib/auth-helpers";
import ForbiddenState from "@/components/system/ForbiddenState";

// Which role each dashboard section belongs to. /dashboard/profile is open to everyone logged in.
const SECTION_ROLE = [
  ["/dashboard/customer", "customer"],
  ["/dashboard/technician", "technician"],
  ["/dashboard/admin", "admin"],
];

export default function DashboardGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  const required = SECTION_ROLE.find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )?.[1];

  useEffect(() => {
    // Never redirect while the session is still loading: this is what keeps a
    // logged-in user from being thrown to /sign-in on page reload.
    if (!isPending && !user) {
      router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, user, pathname, router]);

  if (isPending || !user) {
    return (
      <p role="status" className="p-8 text-center text-sm">
        Checking your session…
      </p>
    );
  }

  if (required && user.role !== required) {
    return <ForbiddenState dashboardHref={dashboardFor(user.role)} />;
  }

  return children;
}