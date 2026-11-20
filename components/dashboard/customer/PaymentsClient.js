"use client";

import { useApiData } from "@/lib/use-api-data";
import PaymentsSection from "./PaymentsSection";
import RetryErrorState from "./RetryErrorState";

export default function PaymentsClient() {
  const { data, error, isLoading, reload } = useApiData("/api/payments/my");
  const payments = data?.payments ?? [];

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load your payments"
        description="The payment history is unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  return <PaymentsSection payments={payments} loading={isLoading} />;
}
