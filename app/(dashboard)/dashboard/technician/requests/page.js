import PageHeader from "@/components/dashboard/PageHeader";
import RequestsSection from "@/components/dashboard/technician/RequestsSection";
import { technicianRequests } from "@/data/mock/technicianRequests";

export const metadata = {
  title: "Requests",
  description:
    "Incoming FixMate repair requests with customer contact details, problem description and status actions.",
};

export default function TechnicianRequestsPage() {
  // MOCK ONLY: replaced by the technician's bookings from the API.
  // The status filter is visual only — its value is not read here.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Requests"
        description="Review incoming jobs, accept the ones you can take and close completed work."
      />
      <RequestsSection requests={technicianRequests} />
    </div>
  );
}
