/**
 * StatusBadge — booking status, identical across every dashboard (A01 §3).
 * Pill + leading dot + always-visible text label (never color-only).
 * Unknown statuses fall back to a neutral gray style.
 */
const STATUS_STYLES = {
  Requested: {
    badge: "bg-status-requested-soft text-status-requested",
    dot: "bg-status-requested",
  },
  Accepted: {
    badge: "bg-status-accepted-soft text-status-accepted",
    dot: "bg-status-accepted",
  },
  "In Progress": {
    badge: "bg-status-progress-soft text-status-progress",
    dot: "bg-status-progress",
  },
  Completed: {
    badge: "bg-status-completed-soft text-status-completed",
    dot: "bg-status-completed",
  },
  Rejected: {
    badge: "bg-status-rejected-soft text-status-rejected",
    dot: "bg-status-rejected",
  },
  Cancelled: {
    badge: "bg-status-cancelled-soft text-status-cancelled",
    dot: "bg-status-cancelled",
  },
};

const NEUTRAL = { badge: "bg-surface-soft text-muted", dot: "bg-muted" };

export default function StatusBadge({ status, className = "" }) {
  const styles = STATUS_STYLES[status] || NEUTRAL;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}
