import PageHeader from "@/components/dashboard/PageHeader";
import MyServicesSection from "@/components/dashboard/technician/MyServicesSection";
import {
  technician,
  technicianServices,
} from "@/data/mock/technicianServices";

export const metadata = {
  title: "My Services",
  description:
    "Manage your FixMate service listings, approval state and availability.",
};

export default function TechnicianMyServicesPage() {
  // MOCK ONLY: replaced by the technician's services from the API.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="My Services"
        description="Edit a listing, pause availability or remove a service. Changes to a published listing go back to review."
      />
      <MyServicesSection
        services={technicianServices}
        technician={technician}
      />
    </div>
  );
}
