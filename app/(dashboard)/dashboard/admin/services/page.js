import PageHeader from "@/components/dashboard/PageHeader";
import ServicesSection from "@/components/dashboard/admin/ServicesSection";
import { allServices } from "@/data/mock/adminData";

export const metadata = {
  title: "Admin Services",
  description:
    "Moderation queue for service listings, with pending submissions shown first.",
};

export default function AdminServicesPage() {
  // MOCK ONLY: replaced by the service queue from the API. Pending rows are
  // ordered first in the section; the filter is visual only.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Services"
        description="Approve or reject submitted listings. Pending items are shown first so nothing waits in the queue."
      />
      <ServicesSection services={allServices} />
    </div>
  );
}
