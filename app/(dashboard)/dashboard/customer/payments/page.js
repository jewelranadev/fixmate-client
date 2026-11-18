import PageHeader from "@/components/dashboard/PageHeader";
import PaymentsSection from "@/components/dashboard/customer/PaymentsSection";
import { payments } from "@/data/mock/payments";

export const metadata = {
  title: "Payments",
  description:
    "Your FixMate payment history with service, technician, amount, transaction ID and payment date.",
};

export default function CustomerPaymentsPage() {
  // MOCK ONLY: replaced by the customer's payments from the API.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Payments"
        description="Receipts for completed repairs, with transaction details you can match to your statement."
      />
      <PaymentsSection payments={payments} />
    </div>
  );
}
