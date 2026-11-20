"use client";

import { useApiData } from "@/lib/use-api-data";
import CustomerDashboardSkeleton from "./CustomerDashboardSkeleton";
import OverviewSection from "./OverviewSection";
import RetryErrorState from "./RetryErrorState";

// ISO timestamps sort correctly as strings; newest first keeps "latest 3" true
// regardless of the order the API returns.
const newestFirst = (a, b) =>
  String(b?.createdAt ?? "").localeCompare(String(a?.createdAt ?? ""));

export default function OverviewClient() {
  const { data, error, isLoading, reload } = useApiData("/api/bookings/my");

  if (isLoading) return <CustomerDashboardSkeleton />;

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load your dashboard"
        description="Your bookings are unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  const bookings = [...(data?.bookings ?? [])].sort(newestFirst);

  return <OverviewSection bookings={bookings} />;
}
