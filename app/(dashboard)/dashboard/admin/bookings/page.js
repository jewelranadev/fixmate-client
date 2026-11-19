import PageHeader from "@/components/dashboard/PageHeader";
import BookingsSection from "@/components/dashboard/admin/BookingsSection";
import { allBookings } from "@/data/mock/adminData";

export const metadata = {
  title: "Admin Bookings",
  description:
    "Read-only view of every repair booking, its status, payment state and amount.",
};

export default function AdminBookingsPage() {
  // MOCK ONLY: replaced by the booking feed from the API.
  // The status filter is visual only — its value is not read here.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Bookings"
        description="Every repair request across the marketplace. This view is read-only."
      />
      <BookingsSection bookings={allBookings} />
    </div>
  );
}
