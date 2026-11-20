"use client";

import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApiData } from "@/lib/use-api-data";
import BookingsSection from "./BookingsSection";
import RetryErrorState from "./RetryErrorState";

export default function BookingsClient() {
  const { data, error, isLoading, reload } = useApiData("/api/bookings/my");
  const bookings = data?.bookings ?? [];

  async function handleCancel(id) {
    try {
      await apiFetch(`/api/bookings/${encodeURIComponent(id)}/cancel`, {
        method: "PATCH",
      });
      toast.success("Booking cancelled");
      reload();
    } catch (err) {
      toast.error(err.message || "Could not cancel this booking");
    }
  }

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load your bookings"
        description="The booking list is unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  return (
    <BookingsSection
      bookings={bookings}
      loading={isLoading}
      onCancel={handleCancel}
    />
  );
}
