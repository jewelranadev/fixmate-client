"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApiData } from "@/lib/use-api-data";
import BookingsSection from "./BookingsSection";
import RetryErrorState from "./RetryErrorState";

export default function BookingsClient() {
  const { data, error, isLoading, reload } = useApiData("/api/bookings/my");
  const bookings = data?.bookings ?? [];
  const [payingId, setPayingId] = useState(null);

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
  async function handlePay(id) {
    if (payingId) return; // one Checkout Session at a time
    setPayingId(id);

    try {
      const { url } = await apiFetch("/api/payments/create-checkout-session", {
        method: "POST",
        body: { bookingId: id }, // only the id: the server reads the amount from the database
      });
      if (!url) throw new Error("Stripe did not return a checkout URL");
      window.location.assign(url); // redirect to Stripe Checkout
    } catch (err) {
      toast.error(err.message || "Could not start the payment");
      setPayingId(null);
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
      onPay={handlePay}
      payingId={payingId}
    />
  );
}
