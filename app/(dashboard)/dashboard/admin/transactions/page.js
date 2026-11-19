import PageHeader from "@/components/dashboard/PageHeader";
import TransactionsSection from "@/components/dashboard/admin/TransactionsSection";
import { allPayments } from "@/data/mock/adminData";

export const metadata = {
  title: "Admin Transactions",
  description:
    "Paid bookings with Stripe references and the mock total revenue figure.",
};

export default function AdminTransactionsPage() {
  // MOCK ONLY: replaced by the payment log from the API. Revenue is summed
  // from the mock rows inside the section.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Transactions"
        description="Payments collected through Stripe, newest first, with the reference for each charge."
      />
      <TransactionsSection payments={allPayments} />
    </div>
  );
}
