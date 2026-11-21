import { Suspense } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import RequestsClient from "@/components/dashboard/technician/RequestsClient";

export const metadata = { title: "Manage Requests" };

export default function TechnicianRequestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Requests"
        description="Review incoming repair requests and move each job through its stages."
      />
      <Suspense fallback={null}>
        <RequestsClient />
      </Suspense>
    </div>
  );
}