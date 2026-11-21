"use client";

import { useApiData } from "@/lib/use-api-data";
import TransactionsSection from "./TransactionsSection";
import RetryErrorState from "@/components/dashboard/customer/RetryErrorState";

export default function TransactionsClient() {
  const { data, error, isLoading, reload } = useApiData("/api/admin/payments");

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load the transactions"
        description="Payment records are unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  return <TransactionsSection payments={data?.payments ?? []} loading={isLoading} />;
}