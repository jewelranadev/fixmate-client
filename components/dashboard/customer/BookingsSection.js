import Image from "next/image";
import { CalendarDays } from "lucide-react";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import BookingStatus from "@/components/dashboard/BookingStatus";
import PaymentStatus from "@/components/dashboard/PaymentStatus";
import ResponsiveDataList from "@/components/dashboard/ResponsiveDataList";
import { formatCurrency, formatDate } from "@/lib/format/display";

/**
 * BookingsSection — presentational customer bookings list.
 *
 * Takes `bookings` as a prop (empty array previews the empty state) plus
 * `loading` / `error` flags for the skeleton and error presentations.
 * Actions are visual only: Cancel opens a confirmation dialog, Pay Now has
 * no handler.
 */

function Price({ booking }) {
  const isCompleted = booking.status === "completed";
  const amount = isCompleted ? booking.finalAmount : booking.basePrice;
  const differs = isCompleted && booking.finalAmount !== booking.basePrice;

  return (
    <div className="whitespace-nowrap">
      <p className="text-sm font-semibold text-foreground">
        {formatCurrency(amount)}
      </p>
      {differs ? (
        <p className="mt-0.5 text-xs text-muted">
          base{" "}
          <span className="line-through">
            {formatCurrency(booking.basePrice)}
          </span>
        </p>
      ) : (
        <p className="mt-0.5 text-xs text-muted">
          {isCompleted ? "final" : "base price"}
        </p>
      )}
    </div>
  );
}

function BookingActions({ booking }) {
  if (booking.status === "requested") {
    return (
      <ConfirmDialog
        title="Cancel this request?"
        description={`This cancels your request for ${booking.serviceTitle}. You can book the service again later.`}
        confirmLabel="Cancel request"
        tone="danger"
        trigger={
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="min-h-11 border border-danger/40 text-danger hover:bg-danger-soft"
          >
            Cancel
          </Button>
        }
      />
    );
  }

  if (booking.status === "completed" && booking.paymentStatus === "unpaid") {
    return (
      // Wired by owner in manual phase M9 (Stripe Checkout).
      <Button type="button" size="sm" className="min-h-11">
        Pay Now
      </Button>
    );
  }

  return null;
}

function BookingCard({ booking }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <Image
          src={booking.serviceImage}
          alt={booking.serviceTitle}
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-field object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            {booking.serviceTitle}
          </p>
          <p className="mt-0.5 text-xs text-muted">{booking.category}</p>
        </div>
        <BookingStatus status={booking.status} className="shrink-0" />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
        <div>
          <dt className="text-xs text-muted">Technician</dt>
          <dd className="mt-0.5 truncate text-sm font-medium text-foreground">
            {booking.technicianName}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Preferred date</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {formatDate(booking.preferredDate)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Price</dt>
          <dd className="mt-0.5">
            <Price booking={booking} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Payment</dt>
          <dd className="mt-0.5">
            <PaymentStatus status={booking.paymentStatus} />
          </dd>
        </div>
      </dl>

      <div className="flex min-h-11 items-center justify-end border-t border-border pt-3">
        <BookingActions booking={booking} />
      </div>
    </div>
  );
}

export default function BookingsSection({
  bookings = [],
  loading = false,
  error = false,
}) {
  if (error) {
    return (
      <ErrorState
        title="We couldn't load your bookings"
        description="The booking list is unavailable right now. Try again in a moment."
      />
    );
  }

  return (
    <ResponsiveDataList
      label="My bookings"
      loading={loading}
      rows={bookings}
      rowKey={(booking) => booking._id}
      minWidthClass="min-w-[920px]"
      empty={
        <EmptyState
          icon={CalendarDays}
          title="No bookings yet"
          description="When you request a repair, it will show up here with its status, technician and payment details."
          action={{ label: "Browse services", href: "/services" }}
        />
      }
      columns={[
        {
          key: "service",
          header: "Service",
          render: (booking) => (
            <div className="flex items-center gap-3">
              <Image
                src={booking.serviceImage}
                alt={booking.serviceTitle}
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-field object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {booking.serviceTitle}
                </p>
                <p className="text-xs text-muted">{booking.category}</p>
              </div>
            </div>
          ),
        },
        {
          key: "technician",
          header: "Technician",
          render: (booking) => (
            <span className="whitespace-nowrap text-sm text-foreground">
              {booking.technicianName}
            </span>
          ),
        },
        {
          key: "preferredDate",
          header: "Preferred date",
          render: (booking) => (
            <span className="whitespace-nowrap text-sm text-foreground">
              {formatDate(booking.preferredDate)}
            </span>
          ),
        },
        {
          key: "price",
          header: "Price",
          render: (booking) => <Price booking={booking} />,
        },
        {
          key: "status",
          header: "Status",
          render: (booking) => <BookingStatus status={booking.status} />,
        },
        {
          key: "payment",
          header: "Payment",
          render: (booking) => (
            <PaymentStatus status={booking.paymentStatus} />
          ),
        },
        {
          key: "actions",
          header: "Actions",
          headerClassName: "text-right",
          className: "text-right",
          render: (booking) => (
            <div className="flex justify-end">
              <BookingActions booking={booking} />
            </div>
          ),
        },
      ]}
      renderCard={(booking) => <BookingCard booking={booking} />}
    />
  );
}
