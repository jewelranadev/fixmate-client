"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { dashboardFor, safeRedirect } from "@/lib/auth-helpers";

export default function RedirectIfAuthed() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && data?.user) {
      // honour ?redirect= so it does not fight the sign-in handler
      router.replace(safeRedirect(searchParams.get("redirect"), dashboardFor(data.user.role)));
    }
  }, [isPending, data, router, searchParams]);

  return null;
}