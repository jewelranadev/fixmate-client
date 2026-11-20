import Image from "next/image";
import Link from "next/link";
import { CircleCheck, ClipboardList, Wrench } from "lucide-react";
import Card from "@/components/ui/Card";
import BookingStatus, {
  BOOKING_STATUS_ORDER,
  bookingStatusMeta,
} from "@/components/dashboard/BookingStatus";
import StatsCard from "@/components/dashboard/StatsCard";
import DonutChart from "@/components/charts/DonutChart";
import { formatDate } from "@/lib/format/display";

/**
 * OverviewSection — presentational customer overview.
 * Takes the booking array as a prop so the preview can render it empty.
 */
const ACTIVE_STATUSES = ["requested", "accepted", "in-progress"];

export default function OverviewSection({ bookings = [] }) {
  const total = bookings.length;
  const active = bookings.filter((booking) =>
    ACTIVE_STATUSES.includes(booking.status),
  ).length;
  const completed = bookings.filter(
    (booking) => booking.status === "completed",
  ).length;

  const chartData = BOOKING_STATUS_ORDER.map((status) => ({
    label: bookingStatusMeta(status).label,
    value: bookings.filter((booking) => booking.status === status).length,
    color: bookingStatusMeta(status).chartColor,
  }));

  const recent = bookings.slice(0, 3);

  return (
    <section className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          icon={ClipboardList}
          label="Total Requests"
          value={total}
          hint="All bookings you have sent"
          tone="primary"
        />
        <StatsCard
          icon={Wrench}
          label="Active Jobs"
          value={active}
          hint="Requested, accepted or in progress"
          tone="warning"
        />
        <StatsCard
          icon={CircleCheck}
          label="Completed Jobs"
          value={completed}
          hint="Finished repairs, paid or unpaid"
          tone="success"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <DonutChart
          title="Bookings by status"
          data={chartData}
          centerLabel="bookings"
        />

        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-ink">Recent bookings</h2>
            <Link
              href="/dashboard/customer/bookings"
              className="inline-flex min-h-11 items-center rounded-field px-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              View all
            </Link>
          </div>

          {recent.length > 0 ? (
            <ul className="mt-2 divide-y divide-border">
              {recent.map((booking) => (
                <li
                  key={booking._id}
                  className="flex items-center gap-3 py-3 last:pb-0"
                >
                  <Image
                    src={booking.serviceImage}
                    alt={booking.serviceTitle}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-field object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {booking.serviceTitle}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {booking.technicianName} ·{" "}
                      {formatDate(booking.preferredDate)}
                    </p>
                  </div>
                  <BookingStatus
                    status={booking.status}
                    className="shrink-0"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">
              No bookings yet. Your latest requests will appear here.
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
