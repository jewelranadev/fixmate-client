import { Suspense } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import ServicesClient from "@/components/dashboard/admin/ServicesClient";

export const metadata = {
  title: "Service Approval",
};

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Service approval"
        description="Review listings. Pending services are shown first."
      />

      <Suspense fallback={null}>
        <ServicesClient />
      </Suspense>
    </div>
  );
}