"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApiData } from "@/lib/use-api-data";
import { useAuthUser } from "@/lib/use-auth-user";
import UsersSection from "./UsersSection";
import RetryErrorState from "@/components/dashboard/customer/RetryErrorState";

export default function UsersClient() {
  const { user: me } = useAuthUser();
  const { data, error, isLoading, reload } = useApiData("/api/admin/users");
  const [savingIds, setSavingIds] = useState({});

  async function changeRole(id, role) {
    const key = String(id);
    if (savingIds[key]) return;

    setSavingIds((current) => ({ ...current, [key]: true }));
    try {
      await apiFetch(`/api/admin/users/${encodeURIComponent(id)}/role`, {
        method: "PATCH",
        body: { role },
      });
      toast.success("Role updated");
      reload();
    } catch (err) {
      toast.error(err.message || "Could not update the role");
    } finally {
      setSavingIds((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
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
      savingIds={savingIds}
      onChangeRole={changeRole}
    />
  );
}