import PageHeader from "@/components/dashboard/PageHeader";
import OverviewSection from "@/components/dashboard/technician/OverviewSection";
import { technicianRequests } from "@/data/mock/technicianRequests";
import { technicianServices } from "@/data/mock/technicianServices";

export const metadata = {
  title: "Technician Overview",
  description:
    "Service listings, approval state and incoming repair requests for your FixMate technician account.",
};

export default function TechnicianDashboardPage() {
  // MOCK ONLY: counts, chart values and latest rows come from the mock
  // arrays. The signed-in technician's data arrives from the API later.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Overview"
        description="Your listings, approval state and the requests waiting for a response."
      />
      <OverviewSection
        services={technicianServices}
        requests={technicianRequests}
      />
    </div>
  );
}
