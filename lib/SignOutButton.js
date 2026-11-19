"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton({ className, children }) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} className={className}>
      {children}
    </button>
  );
}