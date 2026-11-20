import PageHeader from "@/components/dashboard/PageHeader";
import OverviewClient from "@/components/dashboard/customer/OverviewClient";

export const metadata = {
  title: "Overview",
  description:
    "Your FixMate repair requests, active jobs, completed work and payments at a glance.",
};

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Overview"
        description="Track your repair requests, active jobs, completed work and payments."
      />
      <OverviewClient />
    </div>
  );
}
