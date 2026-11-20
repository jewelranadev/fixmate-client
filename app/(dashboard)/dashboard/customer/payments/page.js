import PageHeader from "@/components/dashboard/PageHeader";
import PaymentsClient from "@/components/dashboard/customer/PaymentsClient";

export const metadata = {
  title: "Payments",
  description:
    "Your FixMate payment history with service, technician, amount, transaction ID and payment date.",
};

export default function CustomerPaymentsPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Payments"
        description="Receipts for completed repairs, with transaction details you can match to your statement."
      />
      <PaymentsClient />
    </div>
  );
}
