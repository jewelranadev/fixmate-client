import { Suspense } from "react";
import PaymentCancelClient from "@/components/system/PaymentCancelClient";

export const metadata = {
  title: "Payment cancelled",
  description:
    "The FixMate payment was cancelled before it finished. Nothing was charged and the booking is still waiting for payment.",
};

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={null}>
      <PaymentCancelClient />
    </Suspense>
  );
}
