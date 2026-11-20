import PageHeader from "@/components/dashboard/PageHeader";
import BookingsClient from "@/components/dashboard/customer/BookingsClient";

export const metadata = {
  title: "My Bookings",
  description:
    "Every FixMate repair request you have sent, with technician, preferred date, price, status and payment state.",
};

export default function CustomerBookingsPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="My Bookings"
        description="Every repair request you have sent, from first request to payment."
      />
      <BookingsClient />
    </div>
  );
}
