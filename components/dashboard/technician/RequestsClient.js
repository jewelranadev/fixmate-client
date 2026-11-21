"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApiData } from "@/lib/use-api-data";
import RequestsSection from "./RequestsSection";
import RetryErrorState from "@/components/dashboard/customer/RetryErrorState";

const SUCCESS = {
  accepted: "Request accepted",
  rejected: "Request rejected",
  "in-progress": "Work started",
  completed: "Job marked as completed",
};

export default function RequestsClient() {
  // The filter form is a plain GET form, so the choice lives in the URL
  const status = useSearchParams().get("status") || "all";
  const path =
    status === "all"
      ? "/api/bookings/technician"
      : `/api/bookings/technician?status=${encodeURIComponent(status)}`;

  const { data, error, isLoading, reload } = useApiData(path);

  // Returns true/false: the Modal stays open when false
  async function changeStatus(id, next, finalAmount) {
    const body = { status: next };

    if (next === "completed") {
      const amount = Number(finalAmount);
      if (!Number.isFinite(amount) || amount <= 0) {
        toast.error("Final amount must be greater than 0");
        return false;
      }
      body.finalAmount = amount;
    }

    try {
      await apiFetch(`/api/bookings/${encodeURIComponent(id)}/status`, {
        method: "PATCH",
        body,
      });
      toast.success(SUCCESS[next]);
      reload();
      return true;
    } catch (err) {
      toast.error(err.message || "Could not update this request");
      return false;
    }
  }

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load your requests"
        description="Incoming repair requests are unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  return (
    <RequestsSection
      requests={data?.bookings ?? []}
      defaultStatus={status}
      loading={isLoading}
      onStatus={changeStatus}
    />
  );
}