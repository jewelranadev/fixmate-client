import PageHeader from "@/components/dashboard/PageHeader";
import BookingsSection from "@/components/dashboard/customer/BookingsSection";
import { bookings } from "@/data/mock/bookings";

export const metadata = {
  title: "My Bookings",
  description:
    "Every FixMate repair request you have sent, with technician, preferred date, price, status and payment state.",
};

export default function CustomerBookingsPage() {
  // MOCK ONLY: replaced by the customer's bookings from the API.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="My Bookings"
        description="Every repair request you have sent, from first request to payment."
      />
      <BookingsSection bookings={bookings} />
    </div>
  );
}
