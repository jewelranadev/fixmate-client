/**
 * ApprovalBadge — service approval state for the technician dashboard.
 * Pill + leading dot + always-visible text label (never color-only).
 * Distinct from StatusBadge/PaymentBadge on purpose; both stay untouched.
 *
 * Accepts the assignment enum values:
 *   "pending" | "approved" | "rejected"
 * Unknown values fall back to the neutral gray style.
 */
const APPROVAL_STYLES = {
  pending: {
    label: "Pending",
    badge: "bg-warning-soft text-warning",
    dot: "bg-warning",
  },
  approved: {
    label: "Approved",
    badge: "bg-success-soft text-success",
    dot: "bg-success",
  },
  rejected: {
    label: "Rejected",
    badge: "bg-danger-soft text-danger",
    dot: "bg-danger",
  },
};

const NEUTRAL = { badge: "bg-surface-soft text-muted", dot: "bg-muted" };

export default function ApprovalBadge({ status, className = "" }) {
  const styles = APPROVAL_STYLES[status] || NEUTRAL;
  const label = styles.label || status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge} ${className}`}
    >
      <span
        className={`size-1.5 rounded-full ${styles.dot}`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
