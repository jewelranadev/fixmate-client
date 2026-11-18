import Link from "next/link";
import { BadgeCheck, Inbox, Wrench } from "lucide-react";
import Card from "@/components/ui/Card";
import StatsCard from "@/components/dashboard/StatsCard";
import BookingStatus, {
  BOOKING_STATUS_ORDER,
  bookingStatusMeta,
} from "@/components/dashboard/BookingStatus";
import BarChart from "@/components/charts/BarChart";
import { formatDate } from "@/lib/format/display";

/**
 * Technician OverviewSection — presentational only.
 * Takes the service + request arrays as props so the preview can render it
 * with empty data. Counts and ordering are sample data, not business rules.
 */
export default function OverviewSection({ services = [], requests = [] }) {
  // MOCK ONLY: aggregates are computed from the mock arrays. The API supplies
  // these numbers once the dashboard is wired.
  const totalServices = services.length;
  const approvedServices = services.filter(
    (service) => service.approvalStatus === "approved",
  ).length;
  const pendingRequests = requests.filter(
    (request) => request.status === "requested",
  ).length;

  const chartData = BOOKING_STATUS_ORDER.map((status) => ({
    label: bookingStatusMeta(status).label,
    value: requests.filter((request) => request.status === status).length,
    color: bookingStatusMeta(status).chartColor,
  }));

  const latest = [...requests]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 3);

  return (
    <section className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          icon={Wrench}
          label="Total Services"
          value={totalServices}
          hint="Listings you have created"
          tone="primary"
        />
        <StatsCard
          icon={BadgeCheck}
          label="Approved Services"
          value={approvedServices}
          hint="Visible once available"
          tone="success"
        />
        <StatsCard
          icon={Inbox}
          label="Pending Requests"
          value={pendingRequests}
          hint="Waiting for your response"
          tone="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <BarChart title="Requests by status" data={chartData} />

        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-ink">Latest requests</h2>
            <Link
              href="/dashboard/technician/requests"
              className="inline-flex min-h-11 items-center rounded-field px-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              View all
            </Link>
          </div>

          {latest.length > 0 ? (
            <ul className="mt-2 divide-y divide-border">
              {latest.map((request) => (
                <li key={request._id} className="py-3 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {request.customerName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted">
                        {request.serviceTitle} ·{" "}
                        {formatDate(request.preferredDate)}
                      </p>
                    </div>
                    <BookingStatus
                      status={request.status}
                      className="shrink-0"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">
              No requests yet. New booking requests will appear here.
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
