import PageHeader from "@/components/dashboard/PageHeader";
import MyServicesClient from "@/components/dashboard/technician/MyServicesClient";

export const metadata = {
  title: "My Services",
  description:
    "Manage your FixMate service listings, approval state and availability.",
};

export default function TechnicianMyServicesPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="My Services"
        description="Edit a listing, pause availability or remove a service. Changes to a published listing go back to review."
      />
      <MyServicesClient />
    </div>
  );
}
