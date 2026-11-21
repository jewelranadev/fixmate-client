import { Suspense } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AdminBookingsClient from "@/components/dashboard/admin/BookingsClient";

export const metadata = {
  title: "All Bookings",
};

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All bookings"
        description="Every repair request on the platform."
      />

      <Suspense fallback={null}>
        <AdminBookingsClient />
      </Suspense>
    </div>
  );
}