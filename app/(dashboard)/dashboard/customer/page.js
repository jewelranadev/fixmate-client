import PageHeader from "@/components/dashboard/PageHeader";
import OverviewSection from "@/components/dashboard/customer/OverviewSection";
import { bookings } from "@/data/mock/bookings";

export const metadata = {
  title: "Overview",
  description:
    "Your FixMate repair requests, active jobs, completed work and payments at a glance.",
};

export default function CustomerDashboardPage() {
  // MOCK ONLY: counts and recent rows are derived from data/mock/bookings.js.
  // The signed-in customer's bookings come from the API during integration.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Overview"
        description="Track your repair requests, active jobs, completed work and payments."
      />
      <OverviewSection bookings={bookings} />
    </div>
  );
}
