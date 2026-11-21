import Image from "next/image";
import { Pencil, Trash2, Wrench } from "lucide-react";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Modal from "@/components/ui/Modal";
import Switch from "@/components/ui/Switch";
import ApprovalBadge from "@/components/shared/ApprovalBadge";
import ResponsiveDataList from "@/components/dashboard/ResponsiveDataList";
import { formatCurrency } from "@/lib/format/display";
import ServiceFields from "./ServiceFields";

/**
 * Technician MyServicesSection — service list with Edit, Delete and
 * availability actions. Every mutation is delegated to a callback; ownership
 * and authorization remain server-side in /api/services/:id.
 */

function ServiceIdentity({ service, size = 40 }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
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

function Availability({ service, variant, actions }) {
  const id = String(service._id);
  const canToggle = typeof actions.onAvailabilityChange === "function";
  const pending = Boolean(actions.busyIds[id]);
  const checked = actions.availability[id] ?? service.isAvailable;

  return (
    <Switch
      id={`availability-${variant}-${service._id}`}
      name="isAvailable"
      label={pending ? "Saving…" : "Available"}
      ariaLabel={`Available: ${service.title}`}
      checked={canToggle ? checked : undefined}
      defaultChecked={canToggle ? undefined : service.isAvailable}
      onChange={
        canToggle
          ? (event) => actions.onAvailabilityChange(service, event.target.checked)
          : undefined
      }
      disabled={pending}
    />
  );
}

function ServiceActions({ service, technician, variant, actions }) {
  const id = String(service._id);
  const busy = Boolean(actions.busyIds[id]);
  const saving = actions.busyIds[id] === "edit";

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Modal
        title="Edit service"
        description="Update the listing details. The image is replaced only when you choose a new file."
        confirmLabel="Save changes"
        size="lg"
        onConfirm={actions.onEdit ? (dialog) => actions.onEdit(service, dialog) : undefined}
        trigger={
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={busy}
            className="min-h-11 border border-border-strong"
          >
            <Pencil className="size-3.5" aria-hidden="true" />
            Edit
          </Button>
        }
      >
        <div className="space-y-5">
          <Alert
            variant="warning"
            title="Saving changes sends this service back to pending review."
          />
          <ServiceFields
            idPrefix={`edit-${variant}-${service._id}`}
            service={service}
            technician={technician}
            errors={actions.formErrors[id] || {}}
            disabled={saving}
            imageUrl={actions.editImages[id] || service.image}
            onImageUpload={
              actions.onImageUpload
                ? (url) => actions.onImageUpload(service._id, url)
                : undefined
            }
            onImageError={
              actions.onImageError
                ? (message) => actions.onImageError(service._id, message)
                : undefined
            }
            imageError={actions.imageErrors[id]}
          />
          <p className="text-sm text-muted">
            An admin reviews the updated listing before it appears publicly
            again.
          </p>
        </div>
      </Modal>

      <ConfirmDialog
        title="Delete this service?"
        description={`"${service.title}" will be removed from your listings. Requests already booked are not affected.`}
        confirmLabel="Delete service"
        tone="danger"
        onConfirm={actions.onDelete ? () => actions.onDelete(service) : undefined}
        trigger={
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={busy}
            className="min-h-11 border border-danger/40 text-danger hover:bg-danger-soft"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            Delete
          </Button>
        }
      />
    </div>
  );
}

function ServiceCard({ service, technician, actions }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <ServiceIdentity service={service} size={56} />
        <ApprovalBadge status={service.approvalStatus} className="shrink-0" />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
        <div>
          <dt className="text-xs text-muted">Category</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {service.category}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Base price</dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {formatCurrency(service.basePrice)}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="sr-only">Availability</dt>
          <dd>
            <Availability service={service} variant="card" actions={actions} />
          </dd>
        </div>
      </dl>

      <div className="border-t border-border pt-3">
        <ServiceActions
          service={service}
          technician={technician}
          variant="card"
          actions={actions}
        />
      </div>
    </div>
  );
}

export default function MyServicesSection({
  services = [],
  technician,
  loading = false,
  error = false,
  onEdit = null,
  onDelete = null,
  onAvailabilityChange = null,
  editImages = {},
  imageErrors = {},
  formErrors = {},
  availability = {},
  busyIds = {},
  onImageUpload = null,
  onImageError = null,
}) {
  const actions = {
    onEdit,
    onDelete,
    onAvailabilityChange,
    editImages,
    imageErrors,
    formErrors,
    availability,
    busyIds,
    onImageUpload,
    onImageError,
  };

  if (error) {
    return (
      <ErrorState
        title="We couldn't load your services"
        description="Your listings are unavailable right now. Try again in a moment."
      />
    );
  }

  return (
    <ResponsiveDataList
      label="My services"
      loading={loading}
      rows={services}
      rowKey={(service) => service._id}
      minWidthClass="min-w-[900px]"
      skeletonRows={6}
      empty={
        <EmptyState
          icon={Wrench}
          title="No services yet"
          description="Create your first repair listing to start receiving requests from customers."
          action={{
            label: "Add a service",
            href: "/dashboard/technician/add-service",
          }}
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
          key: "basePrice",
          header: "Price",
          render: (service) => (
            <span className="whitespace-nowrap text-sm font-semibold text-foreground">
              {formatCurrency(service.basePrice)}
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
          render: (service) => (
            <Availability service={service} variant="table" actions={actions} />
          ),
        },
        {
          key: "actions",
          header: "Actions",
          headerClassName: "text-right",
          className: "text-right",
          render: (service) => (
            <ServiceActions
              service={service}
              technician={technician}
              variant="table"
              actions={actions}
            />
          ),
        },
      ]}
      renderCard={(service) => (
        <ServiceCard service={service} technician={technician} actions={actions} />
      )}
    />
  );
}
