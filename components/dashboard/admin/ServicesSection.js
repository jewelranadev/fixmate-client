import Image from "next/image";
import { Check, Wrench, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import ApprovalBadge from "@/components/shared/ApprovalBadge";
import ResponsiveDataList from "@/components/dashboard/ResponsiveDataList";
import { formatCurrency } from "@/lib/format/display";

/**
 * Admin ServicesSection — presentational moderation queue.
 *
 * The approval filter is a plain GET form: the UI never reads searchParams
 * and never filters the array. Ordering is static mock ordering.
 * Approve / Reject are visual only; Reject asks for confirmation.
 *
 * Wired by owner in M4/M12: server-side filtering + approval endpoints.
 */

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_RANK = { pending: 0, approved: 1, rejected: 2 };

function ServiceIdentity({ service, size = 40 }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Image
        src={service.image}
        alt={service.title}
        width={size}
        height={size}
        className="shrink-0 rounded-field object-cover"
        style={{ width: size, height: size }}
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {service.title}
        </p>
        <p className="text-xs text-muted">{service._id}</p>
      </div>
    </div>
  );
}

function Technician({ service }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm text-foreground">
        {service.technicianName}
      </p>
      <p className="text-xs text-muted">{service.technicianEmail}</p>
    </div>
  );
}

function Price({ service }) {
  return (
    <div className="whitespace-nowrap">
      <p className="text-sm font-semibold text-foreground">
        {formatCurrency(service.basePrice)}
      </p>
      <p className="mt-0.5 text-xs text-muted">{service.estimatedDuration}</p>
    </div>
  );
}

function Availability({ service }) {
  return (
    <span
      className={`whitespace-nowrap text-sm font-medium ${
        service.isAvailable ? "text-success" : "text-muted"
      }`}
    >
      {service.isAvailable ? "Available" : "Unavailable"}
    </span>
  );
}

function ServiceActions({ service, variant }) {
  const canApprove =
    service.approvalStatus === "pending" ||
    service.approvalStatus === "rejected";
  const canReject =
    service.approvalStatus === "pending" ||
    service.approvalStatus === "approved";

  if (!canApprove && !canReject) return null;

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {canApprove && (
        // Wired by owner in M4/M12 (approval endpoint).
        <Button type="button" size="sm" className="min-h-11">
          <Check className="size-3.5" aria-hidden="true" />
          Approve
        </Button>
      )}
      {canReject && (
        <ConfirmDialog
          title="Reject this service?"
          description={`"${service.title}" by ${service.technicianName} will be rejected and hidden from the public listing. The technician can edit and resubmit it.`}
          confirmLabel="Reject service"
          tone="danger"
          trigger={
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="min-h-11 border border-danger/40 text-danger hover:bg-danger-soft"
            >
              <X className="size-3.5" aria-hidden="true" />
              Reject
            </Button>
          }
        />
      )}
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <ServiceIdentity service={service} size={56} />
        <ApprovalBadge
          status={service.approvalStatus}
          className="shrink-0"
        />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
        <div>
          <dt className="text-xs text-muted">Category</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {service.category}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Price</dt>
          <dd className="mt-0.5">
            <Price service={service} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Technician</dt>
          <dd className="mt-0.5">
            <Technician service={service} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Mode</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {service.serviceMode}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-muted">Availability</dt>
          <dd className="mt-0.5">
            <Availability service={service} />
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center justify-end border-t border-border pt-3">
        <ServiceActions service={service} variant="card" />
      </div>
    </div>
  );
}

export default function ServicesSection({
  services = [],
  defaultStatus = "all",
  loading = false,
  error = false,
  // Unique id prefix: repeated preview instances must not collide.
  idPrefix = "admin-service",
}) {
  if (error) {
    return (
      <ErrorState
        title="We couldn't load the service queue"
        description="Service listings are unavailable right now. Try again in a moment."
      />
    );
  }

  // MOCK ONLY: static ordering puts pending listings first, then approved,
  // then rejected, newest first inside each group. Server-side sorting and
  // filtering are wired by the owner in M4/M12.
  const ordered = [...services].sort(
    (a, b) =>
      (STATUS_RANK[a.approvalStatus] ?? 3) -
        (STATUS_RANK[b.approvalStatus] ?? 3) ||
      String(b.createdAt).localeCompare(String(a.createdAt)),
  );

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-5">
        {/* Wired by owner in M4/M12: server-side filtering. This UI never
            reads searchParams; the form is a plain GET submission. */}
        <form
          method="get"
          action="/dashboard/admin/services"
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="w-full sm:max-w-xs">
            <Field
              label="Approval status"
              htmlFor={`${idPrefix}-status-filter`}
            >
              <Select
                id={`${idPrefix}-status-filter`}
                name="approvalStatus"
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
              href="/dashboard/admin/services"
              variant="ghost"
              className="min-h-11 border border-border-strong"
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>

      <ResponsiveDataList
        label="Service moderation queue"
        loading={loading}
        rows={ordered}
        rowKey={(service) => service._id}
        minWidthClass="min-w-[1180px]"
        skeletonRows={6}
        empty={
          <EmptyState
            icon={Wrench}
            title="No services found"
            description="Submitted listings will appear here for review, with pending items shown first."
          />
        }
        columns={[
          {
            key: "service",
            header: "Service",
            render: (service) => <ServiceIdentity service={service} />,
          },
          {
            key: "category",
            header: "Category",
            render: (service) => (
              <span className="whitespace-nowrap text-sm text-foreground">
                {service.category}
              </span>
            ),
          },
          {
            key: "technician",
            header: "Technician",
            render: (service) => <Technician service={service} />,
          },
          {
            key: "basePrice",
            header: "Price",
            render: (service) => <Price service={service} />,
          },
          {
            key: "serviceMode",
            header: "Mode",
            render: (service) => (
              <span className="whitespace-nowrap text-sm text-foreground">
                {service.serviceMode}
              </span>
            ),
          },
          {
            key: "approvalStatus",
            header: "Approval",
            render: (service) => (
              <ApprovalBadge status={service.approvalStatus} />
            ),
          },
          {
            key: "isAvailable",
            header: "Availability",
            render: (service) => <Availability service={service} />,
          },
          {
            key: "actions",
            header: "Actions",
            headerClassName: "text-right",
            className: "text-right",
            render: (service) => (
              <ServiceActions service={service} variant="table" />
            ),
          },
        ]}
        renderCard={(service) => <ServiceCard service={service} />}
      />
    </div>
  );
}
