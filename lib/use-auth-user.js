"use client";

import { authClient } from "@/lib/auth-client";

const initialsOf = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "U";

// One place that turns the BetterAuth session into the user shape our UI already expects
export function useAuthUser() {
  const { data, isPending } = authClient.useSession();
  const u = data?.user;
    const user = u
    ? {
        id: u.id,                       // ← এটা যোগ করো
        name: u.name,
        email: u.email,
        role: u.role || "customer",
        image: u.image || "",
        initials: initialsOf(u.name),
      }
    : null;
  return { user, isPending };
}