import { CreditCard } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import ResponsiveDataList from "@/components/dashboard/ResponsiveDataList";
import StatsCard from "@/components/dashboard/StatsCard";
import { formatCurrency, formatDate } from "@/lib/format/display";

/**
 * PaymentsSection — presentational customer payment history.
 * Takes `payments` as a prop so the preview can render the empty state, and
 * accepts `loading` / `error` for the skeleton and error presentations.
 */

function TransactionId({ value }) {
  return (
    <span
      title={value}
      className="block max-w-44 truncate font-mono text-xs text-muted"
    >
      {value}
    </span>
  );
}

export default function PaymentsSection({
  payments = [],
  loading = false,
  error = false,
}) {
  if (error) {
    return (
      <ErrorState
        title="We couldn't load your payments"
        description="The payment history is unavailable right now. Try again in a moment."
      />
    );
  }

  // MOCK ONLY: totals are derived from the mock array until the API is wired.
  const total = payments.reduce(
    (sum, payment) => sum + (Number(payment.amount) || 0),
    0,
  );
  const countLabel = `${payments.length} payment${
    payments.length === 1 ? "" : "s"
  }`;

  return (
    <div className="space-y-6">
      <div className="sm:max-w-xs">
        <StatsCard
          icon={CreditCard}
          label="Total paid"
          value={formatCurrency(total)}
          hint={countLabel}
          tone="success"
        />
      </div>

      <ResponsiveDataList
        label="Payment history"
        loading={loading}
        rows={payments}
        rowKey={(payment) => payment._id}
        minWidthClass="min-w-[760px]"
        empty={
          <EmptyState
            icon={CreditCard}
            title="No payments yet"
            description="Payments appear here after a completed job is paid. Your receipts and transaction IDs stay available."
            action={{
              label: "View my bookings",
              href: "/dashboard/customer/bookings",
            }}
          />
        }
        columns={[
          {
            key: "serviceTitle",
            header: "Service",
            render: (payment) => (
              <span className="text-sm font-semibold text-foreground">
                {payment.serviceTitle}
              </span>
            ),
          },
          {
            key: "technicianName",
            header: "Technician",
            render: (payment) => (
              <span className="whitespace-nowrap text-sm text-foreground">
                {payment.technicianName}
              </span>
            ),
          },
          {
            key: "amount",
            header: "Amount",
            render: (payment) => (
              <span className="whitespace-nowrap text-sm font-semibold text-foreground">
                {formatCurrency(payment.amount)}
              </span>
            ),
          },
          {
            key: "transactionId",
            header: "Transaction ID",
            render: (payment) => (
              <TransactionId value={payment.transactionId} />
            ),
          },
          {
            key: "paidAt",
            header: "Payment date",
            render: (payment) => (
              <span className="whitespace-nowrap text-sm text-foreground">
                {formatDate(payment.paidAt)}
              </span>
            ),
          },
        ]}
        renderCard={(payment) => (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {payment.serviceTitle}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {payment.technicianName}
                </p>
              </div>
              <p className="shrink-0 text-sm font-bold text-ink">
                {formatCurrency(payment.amount)}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3 border-t border-border pt-3">
              <div className="min-w-0">
                <dt className="text-xs text-muted">Transaction</dt>
                <dd className="mt-0.5">
                  <TransactionId value={payment.transactionId} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Payment date</dt>
                <dd className="mt-0.5 text-sm font-medium text-foreground">
                  {formatDate(payment.paidAt)}
                </dd>
              </div>
            </dl>
          </div>
        )}
      />
    </div>
  );
}
