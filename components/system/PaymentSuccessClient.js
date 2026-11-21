"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuthUser } from "@/lib/use-auth-user";
import PaymentResult from "./PaymentResult";

export default function PaymentSuccessClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, isPending } = useAuthUser();
  const [state, setState] = useState({ status: "verifying" });

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      // come back to this exact page (with session_id) after signing in
      router.replace(`/sign-in?redirect=${encodeURIComponent(`${pathname}?${searchParams.toString()}`)}`);
      return;
    }
    // A missing session is handled during render, not by setting state here.
    if (!sessionId) return;

    let active = true;
    apiFetch(`/api/payments/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then(({ payment, stripePaymentStatus }) => {
        if (!active) return;
        if (payment?.paymentStatus !== "paid") {
          setState({
            status: "error",
            message:
              stripePaymentStatus === "unpaid"
                ? "This payment was not completed. Your booking is still waiting for payment — you can try again from My Bookings."
                : "We have not confirmed this payment with Stripe yet. Check My Bookings before trying again.",
          });
          return;
        }
        setState({
          status: "success",
          amount: payment.amount,
          transactionId: payment.transactionId,
          serviceTitle: payment.serviceTitle,
        });
      })
      .catch((error) => {
        if (active) setState({ status: "error", message: error.message });
      });
    return () => {
      active = false;
    };
  }, [isPending, user, sessionId, pathname, searchParams, router]);

  if (!isPending && user && !sessionId) {
    return <PaymentResult status="error" message="No payment session was found." />;
  }

  return <PaymentResult {...state} />;
}