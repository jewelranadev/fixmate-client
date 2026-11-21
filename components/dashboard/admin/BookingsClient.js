"use client";

import { useSearchParams } from "next/navigation";
import { useApiData } from "@/lib/use-api-data";
import BookingsSection from "./BookingsSection";
import RetryErrorState from "@/components/dashboard/customer/RetryErrorState";

export default function AdminBookingsClient() {
  const status = useSearchParams().get("status") || "all";
  const path =
    status === "all"
      ? "/api/admin/bookings"
      : `/api/admin/bookings?status=${encodeURIComponent(status)}`;

  const { data, error, isLoading, reload } = useApiData(path);

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load the bookings"
        description="Marketplace bookings are unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  return (
    <BookingsSection bookings={data?.bookings ?? []} defaultStatus={status} loading={isLoading} />
  );
}