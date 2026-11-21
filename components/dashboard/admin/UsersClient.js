"use client";

import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApiData } from "@/lib/use-api-data";
import { useAuthUser } from "@/lib/use-auth-user";
import UsersSection from "./UsersSection";
import RetryErrorState from "@/components/dashboard/customer/RetryErrorState";

export default function UsersClient() {
  const { user: me } = useAuthUser();
  const { data, error, isLoading, reload } = useApiData("/api/admin/users");

  async function changeRole(id, role) {
    try {
      await apiFetch(`/api/admin/users/${encodeURIComponent(id)}/role`, {
        method: "PATCH",
        body: { role },
      });
      toast.success("Role updated");
      reload();
    } catch (err) {
      toast.error(err.message || "Could not update the role");
    }
  }

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load the user directory"
        description="User accounts are unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  return (
    <UsersSection
      users={data?.users ?? []}
      currentUserId={me?.id ?? null}
      loading={isLoading}
      onChangeRole={changeRole}
    />
  );
}