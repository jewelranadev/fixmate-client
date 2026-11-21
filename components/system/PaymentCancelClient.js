"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useAuthUser } from "@/lib/use-auth-user";
import PaymentCancelled from "./PaymentCancelled";

export default function PaymentCancelClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const { user, isPending } = useAuthUser();
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (isPending || user) return;
    // Keep the booking id so the customer lands back on the retryable page.
    router.replace(
      `/sign-in?redirect=${encodeURIComponent(`${pathname}?${searchParams.toString()}`)}`
    );
  }, [isPending, user, pathname, searchParams, router]);

  async function handleRetry() {
    if (isRetrying || isPending) return;
    if (!bookingId) {
      toast.error("No booking was found for this payment. Open My Bookings to try again.");
      return;
    }
    if (!user) {
      router.replace(
        `/sign-in?redirect=${encodeURIComponent(`${pathname}?${searchParams.toString()}`)}`
      );
      return;
    }

    setIsRetrying(true);
    try {
      const { url } = await apiFetch("/api/payments/create-checkout-session", {
        method: "POST",
        body: { bookingId }, // the server reloads the amount from MongoDB
      });
      if (!url) throw new Error("Stripe did not return a checkout URL");
      window.location.assign(url);
    } catch (err) {
      toast.error(err.message || "Could not start the payment");
      setIsRetrying(false);
    }
  }

  return (
    <PaymentCancelled
      onRetry={bookingId ? handleRetry : null}
      isRetrying={isRetrying || isPending}
    />
  );
}
