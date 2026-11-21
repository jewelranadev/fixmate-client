import PageHeader from "@/components/dashboard/PageHeader";
import AddServiceClient from "@/components/dashboard/technician/AddServiceClient";

export const metadata = {
  title: "Add Service",
  description:
    "Create a new repair listing for your FixMate technician profile. New services wait for admin approval.",
};

export default function TechnicianAddServicePage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Add Service"
        description="Describe the repair, set a starting price and submit it for admin approval."
      />
      <AddServiceClient />
    </div>
  );
}
