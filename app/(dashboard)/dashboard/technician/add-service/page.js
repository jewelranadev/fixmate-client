import PageHeader from "@/components/dashboard/PageHeader";
import AddServiceSection from "@/components/dashboard/technician/AddServiceSection";
import { technician } from "@/data/mock/technicianServices";

export const metadata = {
  title: "Add Service",
  description:
    "Create a new repair listing for your FixMate technician profile. New services wait for admin approval.",
};

export default function TechnicianAddServicePage() {
  // MOCK ONLY: the read-only technician identity comes from the mock
  // technician. The form is visual only and submits nothing.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Add Service"
        description="Describe the repair, set a starting price and submit it for admin approval."
      />
      <AddServiceSection technician={technician} />
    </div>
  );
}
