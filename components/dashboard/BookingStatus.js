import StatusBadge from "@/components/shared/StatusBadge";

/**
 * BookingStatus — maps the assignment's exact status strings to the labels
 * StatusBadge understands. StatusBadge itself is untouched.
 *
 * Assignment statuses:
 *   "requested" | "accepted" | "in-progress" | "completed" | "rejected" | "cancelled"
 * StatusBadge expects: Requested / Accepted / In Progress / Completed / Rejected / Cancelled
 */
export const BOOKING_STATUS_META = {
  requested: {
    label: "Requested",
    badge: "Requested",
    chartColor: "var(--color-status-requested)",
  },
  accepted: {
    label: "Accepted",
    badge: "Accepted",
    chartColor: "var(--color-status-accepted)",
  },
  "in-progress": {
    label: "In Progress",
    badge: "In Progress",
    chartColor: "var(--color-status-progress)",
  },
  completed: {
    label: "Completed",
    badge: "Completed",
    chartColor: "var(--color-status-completed)",
  },
  rejected: {
    label: "Rejected",
    badge: "Rejected",
    chartColor: "var(--color-status-rejected)",
  },
  cancelled: {
    label: "Cancelled",
    badge: "Cancelled",
    chartColor: "var(--color-status-cancelled)",
  },
};

const FALLBACK = {
  label: "Unknown",
  badge: "Unknown",
  chartColor: "var(--color-muted)",
};

// Ordered list used by charts and legends (stable order, not data order).
export const BOOKING_STATUS_ORDER = [
  "requested",
  "accepted",
  "in-progress",
  "completed",
  "rejected",
  "cancelled",
];

export function bookingStatusMeta(status) {
  return BOOKING_STATUS_META[status] || { ...FALLBACK, label: status, badge: status };
}

export default function BookingStatus({ status, className = "" }) {
  const { badge } = bookingStatusMeta(status);
  return <StatusBadge status={badge} className={className} />;
}
