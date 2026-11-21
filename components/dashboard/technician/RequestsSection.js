import { Inbox } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import BookingStatus from "@/components/dashboard/BookingStatus";
import PaymentStatus from "@/components/dashboard/PaymentStatus";
import ResponsiveDataList from "@/components/dashboard/ResponsiveDataList";
import { formatDate } from "@/lib/format/display";

/**
 * Technician RequestsSection — presentational only.
 *
 * The status filter is a plain GET form: the UI never reads searchParams and
 * never filters the array. Actions are visual only; Accept / Start Work have
 * no handlers, Reject asks for confirmation and Mark Completed opens a modal
 * with the final amount pre-filled from the base price.
 *
 * Wired by owner in M8 (accept / reject / start / complete + filtering).
 */

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

function RequestActions({ request, variant, onStatus }) {
  if (request.status === "requested") {
    return (
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button
          type="button"
          size="sm"
          className="min-h-11"
          onClick={onStatus ? () => onStatus(request._id, "accepted") : undefined}
        >
          Accept
        </Button>
        <ConfirmDialog
          title="Reject this request?"
          description={`This rejects ${request.customerName}'s request for ${request.serviceTitle}. The customer will be notified.`}
          confirmLabel="Reject request"
          tone="danger"
          onConfirm={onStatus ? () => onStatus(request._id, "rejected") : undefined}
          trigger={
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="min-h-11 border border-danger/40 text-danger hover:bg-danger-soft"
            >
              Reject
            </Button>
          }
        />
      </div>
    );
  }

  if (request.status === "accepted") {
    return (
      <Button
        type="button"
        size="sm"
        className="min-h-11"
        onClick={onStatus ? () => onStatus(request._id, "in-progress") : undefined}
      >
        Start Work
      </Button>
    );
  }

  if (request.status === "in-progress") {
    return (
      <Modal
        title="Mark job as completed"
        description={`${request.customerName} · ${request.serviceTitle}`}
        confirmLabel="Mark as completed"
        size="md"
        onConfirm={
          onStatus
            ? (dialog) =>
                onStatus(
                  request._id,
                  "completed",
                  dialog?.querySelector('input[name="finalAmount"]')?.value
                )
            : undefined
        }
        trigger={
          <Button type="button" size="sm" className="min-h-11">
            Mark Completed
          </Button>
        }
      >
        <div className="space-y-4">
          <Field
            label="Final amount (USD)"
            htmlFor={`final-amount-${variant}-${request._id}`}
            helper="Must be greater than 0"
          >
            <Input
              id={`final-amount-${variant}-${request._id}`}
              name="finalAmount"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              defaultValue={request.basePrice}
            />
          </Field>
          <p className="text-sm text-muted">
            This amount is what the customer is charged after completion. The
            base price was ${request.basePrice}.
          </p>
        </div>
      </Modal>
    );
  }

  if (request.status === "completed") {
    return <PaymentStatus status={request.paymentStatus} />;
  }

  return null;
}

function ProblemDescription({ request, clamp = true }) {
  return (
    <p
      title={request.problemDescription}
      className={
        clamp
          ? "line-clamp-2 max-w-[18rem] text-sm text-muted"
          : "text-sm text-muted"
      }
    >
      {request.problemDescription}
    </p>
  );
}

function Contact({ request }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-foreground">
        {request.customerName}
      </p>
      <p className="truncate text-xs text-muted">{request.customerEmail}</p>
    </div>
  );
}

function RequestCard({ request, onStatus }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <Contact request={request} />
        <BookingStatus status={request.status} className="shrink-0" />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
        <div>
          <dt className="text-xs text-muted">Phone</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {request.customerPhone}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Preferred date</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {formatDate(request.preferredDate)}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-muted">Address</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {request.address}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-muted">Service</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {request.serviceTitle}
          </dd>
        </div>
      </dl>

      <div className="border-t border-border pt-3">
        <p className="text-xs text-muted">Problem description</p>
        <div className="mt-1">
          <ProblemDescription request={request} clamp={false} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border pt-3">
        <RequestActions request={request} variant="card" onStatus={onStatus} />
      </div>
    </div>
  );
}

export default function RequestsSection({
  requests = [],
  defaultStatus = "all",
  loading = false,
  error = false,
  idPrefix = "request",
  onStatus,
}) {
  if (error) {
    return (
      <ErrorState
        title="We couldn't load your requests"
        description="Incoming repair requests are unavailable right now. Try again in a moment."
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-5">
        {/* Wired by owner in M8: server-side filtering. This UI never reads
            searchParams; the form is a plain GET submission. */}
        <form
          method="get"
          action="/dashboard/technician/requests"
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
              href="/dashboard/technician/requests"
              variant="ghost"
              className="min-h-11 border border-border-strong"
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>

      <ResponsiveDataList
        label="Repair requests"
        loading={loading}
        rows={requests}
        rowKey={(request) => request._id}
        minWidthClass="min-w-[1120px]"
        skeletonRows={6}
        empty={
          <EmptyState
            icon={Inbox}
            title="No requests found"
            description="When customers book one of your services, their requests will appear here with contact details and status."
          />
        }
        columns={[
          {
            key: "customer",
            header: "Customer",
            render: (request) => <Contact request={request} />,
          },
          {
            key: "customerPhone",
            header: "Phone",
            render: (request) => (
              <span className="whitespace-nowrap text-sm text-foreground">
                {request.customerPhone}
              </span>
            ),
          },
          {
            key: "address",
            header: "Address",
            render: (request) => (
              <span className="block max-w-56 text-sm text-foreground">
                {request.address}
              </span>
            ),
          },
          {
            key: "preferredDate",
            header: "Preferred date",
            render: (request) => (
              <span className="whitespace-nowrap text-sm text-foreground">
                {formatDate(request.preferredDate)}
              </span>
            ),
          },
          {
            key: "problemDescription",
            header: "Problem",
            render: (request) => <ProblemDescription request={request} />,
          },
          {
            key: "service",
            header: "Service",
            render: (request) => (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {request.serviceTitle}
                </p>
                <p className="text-xs text-muted">{request.category}</p>
              </div>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (request) => <BookingStatus status={request.status} />,
          },
          {
            key: "actions",
            header: "Actions",
            headerClassName: "text-right",
            className: "text-right",
            render: (request) => (
              <div className="flex justify-end">
                <RequestActions request={request} variant="table" onStatus={onStatus} />
              </div>
            ),
          },
        ]}
        renderCard={(request) => <RequestCard request={request} onStatus={onStatus} />}
      />
    </div>
  );
}
