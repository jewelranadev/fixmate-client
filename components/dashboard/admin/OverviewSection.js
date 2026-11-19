import Link from "next/link";
import { BadgeCheck, Clock, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import StatsCard from "@/components/dashboard/StatsCard";
import BarChart from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutChart";
import ApprovalBadge from "@/components/shared/ApprovalBadge";
import { formatDate } from "@/lib/format/display";

/**
 * Admin OverviewSection — presentational only.
 * Takes the user + service arrays as props so the preview can render it with
 * smaller datasets. All ordering and counts are mock presentation.
 */
const ROLE_CHART = [
  { role: "customer", label: "Customers", color: "var(--color-muted)" },
  { role: "technician", label: "Technicians", color: "var(--color-secondary)" },
  { role: "admin", label: "Admins", color: "var(--color-navy)" },
];

const APPROVAL_CHART = [
  { status: "pending", label: "Pending", color: "var(--color-warning)" },
  { status: "approved", label: "Approved", color: "var(--color-success)" },
  { status: "rejected", label: "Rejected", color: "var(--color-danger)" },
];

export default function OverviewSection({ users = [], services = [] }) {
  // MOCK ONLY: aggregates are computed from the mock arrays. The API supplies
  // these numbers once the dashboard is wired.
  const totalUsers = users.length;
  const totalTechnicians = users.filter(
    (user) => user.role === "technician",
  ).length;
  const pendingServices = services.filter(
    (service) => service.approvalStatus === "pending",
  );

  const usersByRole = ROLE_CHART.map((entry) => ({
    label: entry.label,
    value: users.filter((user) => user.role === entry.role).length,
    color: entry.color,
  }));

  const servicesByApproval = APPROVAL_CHART.map((entry) => ({
    label: entry.label,
    value: services.filter(
      (service) => service.approvalStatus === entry.status,
    ).length,
    color: entry.color,
  }));

  // MOCK ONLY: newest pending listings first, three shown.
  const shortlist = [...pendingServices]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 3);

  return (
    <section className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          icon={Users}
          label="Total Users"
          value={totalUsers}
          hint="Customers, technicians and admins"
          tone="primary"
        />
        <StatsCard
          icon={BadgeCheck}
          label="Total Technicians"
          value={totalTechnicians}
          hint="Accounts that can offer services"
          tone="secondary"
        />
        <StatsCard
          icon={Clock}
          label="Pending Services"
          value={pendingServices.length}
          hint="Waiting for approval"
          tone="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <DonutChart
          title="Users by role"
          data={usersByRole}
          centerLabel="users"
        />
        <BarChart title="Services by approval status" data={servicesByApproval} />
      </div>

      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-ink">Pending services</h2>
          <Link
            href="/dashboard/admin/services"
            className="inline-flex min-h-11 items-center rounded-field px-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Review all
          </Link>
        </div>

        {shortlist.length > 0 ? (
          <ul className="mt-2 divide-y divide-border">
            {shortlist.map((service) => (
              <li key={service._id} className="py-3 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {service.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {service.technicianName} · {service.category} · submitted{" "}
                      {formatDate(service.createdAt)}
                    </p>
                  </div>
                  <ApprovalBadge
                    status={service.approvalStatus}
                    className="shrink-0"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">
            Nothing waiting for review. New listings will appear here.
          </p>
        )}
      </Card>
    </section>
  );
}
