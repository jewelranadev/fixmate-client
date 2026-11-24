"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApiData } from "@/lib/use-api-data";
import ServicesSection from "./ServicesSection";
import RetryErrorState from "@/components/dashboard/customer/RetryErrorState";

export default function ServicesClient() {
  const status = useSearchParams().get("approvalStatus") || "all";
  const path =
    status === "all"
      ? "/api/admin/services"
      : `/api/admin/services?approvalStatus=${encodeURIComponent(status)}`;

  const { data, error, isLoading, reload } = useApiData(path);
  const [busyIds, setBusyIds] = useState({});

  async function decide(id, approvalStatus) {
    const key = String(id);
    if (busyIds[key]) return;

    setBusyIds((current) => ({ ...current, [key]: approvalStatus }));
    try {
      await apiFetch(`/api/admin/services/${encodeURIComponent(id)}/approval`, {
        method: "PATCH",
        body: { approvalStatus },
      });
      toast.success(approvalStatus === "approved" ? "Service approved" : "Service rejected");
      reload();
    } catch (err) {
      toast.error(err.message || "Could not update the service");
    } finally {
      setBusyIds((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load the service queue"
        description="Service listings are unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  return (
    <ServicesSection
      services={data?.services ?? []}
      defaultStatus={status}
      loading={isLoading}
      busyIds={busyIds}
      onDecision={decide}
    />
  );
}