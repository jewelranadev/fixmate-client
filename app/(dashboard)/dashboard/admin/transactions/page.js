import { Suspense } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import TransactionsClient from "@/components/dashboard/admin/TransactionsClient";

export const metadata = {
  title: "Transactions",
};

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Every payment received through Stripe."
      />

      <Suspense fallback={null}>
        <TransactionsClient />
      </Suspense>
    </div>
  );
}