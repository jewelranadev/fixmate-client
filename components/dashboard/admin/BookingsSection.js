import Image from "next/image";
import { CalendarDays } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import BookingStatus from "@/components/dashboard/BookingStatus";
import PaymentStatus from "@/components/dashboard/PaymentStatus";
import ResponsiveDataList from "@/components/dashboard/ResponsiveDataList";
import { formatCurrency, formatDate } from "@/lib/format/display";

/** 
 * Admin BookingsSection — read-only marketplace view.
 *
 * The status filter is a plain GET form; the UI never reads searchParams and
 * never filters the array. There are deliberately no row actions.
 *
 * Wired by owner in M12: server-side filtering.
 */
const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
  { value: "cancelled", label: "Cancelled" },
];

function Amount({ booking }) {
  const isCompleted = booking.status === "completed";
  const amount = isCompleted ? booking.finalAmount : booking.basePrice;

  return (
    <div className="whitespace-nowrap">
      <p className="text-sm font-semibold text-foreground">
        {formatCurrency(amount)}
      </p>
      <p className="mt-0.5 text-xs text-muted">
        {isCompleted ? "final" : "base price"}
      </p>
    </div>
  );
}

function ServiceCell({ booking }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
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
  );
}

function CustomerCell({ booking }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm text-foreground">
        {booking.customerName}
      </p>
      <p className="truncate text-xs text-muted">{booking.customerEmail}</p>
    </div>
  );
}

function TechnicianCell({ booking }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm text-foreground">
        {booking.technicianName}
      </p>
      <p className="truncate text-xs text-muted">{booking.technicianEmail}</p>
    </div>
  );
}

function BookingCard({ booking }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <ServiceCell booking={booking} />
        <BookingStatus status={booking.status} className="shrink-0" />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
        <div>
          <dt className="text-xs text-muted">Customer</dt>
          <dd className="mt-0.5">
            <CustomerCell booking={booking} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Technician</dt>
          <dd className="mt-0.5">
            <TechnicianCell booking={booking} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Preferred date</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {formatDate(booking.preferredDate)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Amount</dt>
          <dd className="mt-0.5">
            <Amount booking={booking} />
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-muted">Payment</dt>
          <dd className="mt-0.5">
            <PaymentStatus status={booking.paymentStatus} />
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default function BookingsSection({
  bookings = [],
  defaultStatus = "all",
  loading = false,
  error = false,
  // Unique id prefix: repeated preview instances must not collide.
  idPrefix = "admin-booking",
}) {
  if (error) {
    return (
      <ErrorState
        title="We couldn't load the bookings"
        description="Marketplace bookings are unavailable right now. Try again in a moment."
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-5">
        {/* Wired by owner in M12: server-side filtering. This UI never reads
            searchParams; the form is a plain GET submission. */}
        <form
          method="get"
          action="/dashboard/admin/bookings"
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="w-full sm:max-w-xs">
            <Field label="Status" htmlFor={`${idPrefix}-status-filter`}>
              <Select
                id={`${idPrefix}-status-filter`}
                name="status"
                defaultValue={defaultStatus}
              >
                {FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="min-h-11">
              Apply
            </Button>
            <Button
              href="/dashboard/admin/bookings"
              variant="ghost"
              className="min-h-11 border border-border-strong"
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>

      <ResponsiveDataList
        label="All bookings"
        loading={loading}
        rows={bookings}
        rowKey={(booking) => booking._id}
        minWidthClass="min-w-[1100px]"
        skeletonRows={6}
        empty={
          <EmptyState
            icon={CalendarDays}
            title="No bookings found"
            description="Every repair request across the marketplace will show up here with its status and payment state."
          />
        }
        columns={[
          {
            key: "service",
            header: "Service",
            render: (booking) => <ServiceCell booking={booking} />,
          },
          {
            key: "customer",
            header: "Customer",
            render: (booking) => <CustomerCell booking={booking} />,
          },
          {
            key: "technician",
            header: "Technician",
            render: (booking) => <TechnicianCell booking={booking} />,
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
            key: "amount",
            header: "Amount",
            render: (booking) => <Amount booking={booking} />,
          },
        ]}
        renderCard={(booking) => <BookingCard booking={booking} />}
      />
    </div>
  );
}
