import PageHeader from "@/components/dashboard/PageHeader";
import OverviewSection from "@/components/dashboard/admin/OverviewSection";
import { adminUsers } from "@/data/mock/adminUsers";
import { allServices } from "@/data/mock/adminData";

export const metadata = {
  title: "Admin Overview",
  description:
    "Marketplace health at a glance: users by role, service approval status and the pending moderation queue.",
};

export default function AdminDashboardPage() {
  // MOCK ONLY: counts and charts come from the mock arrays. The API supplies
  // them once the admin dashboard is wired.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Overview"
        description="Accounts, service approvals and the moderation queue at a glance."
      />
      <OverviewSection users={adminUsers} services={allServices} />
    </div>
  );
}
