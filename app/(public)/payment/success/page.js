import { Suspense } from "react";
import PaymentSuccessClient from "@/components/system/PaymentSuccessClient";

export const metadata = { title: "Payment successful" };

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessClient />
    </Suspense>
  );
}