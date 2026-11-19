import { Receipt } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import StatsCard from "@/components/dashboard/StatsCard";
import ResponsiveDataList from "@/components/dashboard/ResponsiveDataList";
import { formatCurrency, formatDate } from "@/lib/format/display";

/**
 * Admin TransactionsSection — presentational payment log.
 *
 * The revenue total is summed from the mock array only so the layout has a
 * realistic figure; it is not a real aggregate.
 *
 * MOCK ONLY: server aggregates revenue once payments are wired (M12).
 */
function Amount({ payment }) {
  return (
    <span className="whitespace-nowrap text-sm font-semibold text-foreground">
      {formatCurrency(payment.amount, payment.currency)}
    </span>
  );
}

function Customer({ payment }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-foreground">
        {payment.customerName}
      </p>
      <p className="truncate text-xs text-muted">{payment.customerEmail}</p>
    </div>
  );
}

function Technician({ payment }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm text-foreground">
        {payment.technicianName}
      </p>
      <p className="truncate text-xs text-muted">{payment.technicianEmail}</p>
    </div>
  );
}

function TransactionId({ payment }) {
  return (
    <span
      title={payment.transactionId}
      className="block max-w-44 truncate font-mono text-xs text-foreground"
    >
      {payment.transactionId}
    </span>
  );
}

function TransactionCard({ payment }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {payment.serviceTitle}
          </p>
          <p className="mt-0.5 text-xs text-muted">{payment.bookingId}</p>
        </div>
        <Amount payment={payment} />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
        <div>
          <dt className="text-xs text-muted">Customer</dt>
          <dd className="mt-0.5">
            <Customer payment={payment} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Technician</dt>
          <dd className="mt-0.5">
            <Technician payment={payment} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Paid on</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {formatDate(payment.paidAt)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Transaction ID</dt>
          <dd className="mt-0.5">
            <TransactionId payment={payment} />
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default function TransactionsSection({
  payments = [],
  loading = false,
  error = false,
}) {
  if (error) {
    return (
      <ErrorState
        title="We couldn't load the transactions"
        description="Payment records are unavailable right now. Try again in a moment."
      />
    );
  }

  // MOCK ONLY: server aggregates revenue once payments are wired (M12).
  const totalRevenue = payments.reduce(
    (sum, payment) => sum + (Number(payment.amount) || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <StatsCard
        icon={Receipt}
        label="Total revenue"
        value={formatCurrency(totalRevenue)}
        hint={`Across ${payments.length} paid booking${
          payments.length === 1 ? "" : "s"
        }`}
        tone="success"
      />

      <ResponsiveDataList
        label="Transactions"
        loading={loading}
        rows={payments}
        rowKey={(payment) => payment._id}
        minWidthClass="min-w-[1080px]"
        skeletonRows={5}
        empty={
          <EmptyState
            icon={Receipt}
            title="No transactions yet"
            description="Completed bookings paid through Stripe will appear here with their transaction reference."
          />
        }
        columns={[
          {
            key: "customer",
            header: "Customer",
            render: (payment) => <Customer payment={payment} />,
          },
          {
            key: "technician",
            header: "Technician",
            render: (payment) => <Technician payment={payment} />,
          },
          {
            key: "service",
            header: "Service",
            render: (payment) => (
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">
                  {payment.serviceTitle}
                </p>
                <p className="text-xs text-muted">{payment.bookingId}</p>
              </div>
            ),
          },
          {
            key: "amount",
            header: "Amount",
            render: (payment) => <Amount payment={payment} />,
          },
          {
            key: "transactionId",
            header: "Transaction ID",
            render: (payment) => <TransactionId payment={payment} />,
          },
          {
            key: "paidAt",
            header: "Paid on",
            render: (payment) => (
              <span className="whitespace-nowrap text-sm text-foreground">
                {formatDate(payment.paidAt)}
              </span>
            ),
          },
        ]}
        renderCard={(payment) => <TransactionCard payment={payment} />}
      />
    </div>
  );
}
