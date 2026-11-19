/**
 * RoleBadge — account role for the admin user directory.
 * Pill + leading dot + always-visible text label (never color-only).
 *
 * Colour mapping (existing tokens only):
 *   admin      = solid navy (dark blue)
 *   technician = teal (secondary)
 *   customer   = neutral gray
 * Distinct from StatusBadge / PaymentBadge / ApprovalBadge on purpose.
 */
const ROLE_STYLES = {
  admin: {
    label: "Admin",
    badge: "bg-navy text-white",
    dot: "bg-white/80",
  },
  technician: {
    label: "Technician",
    badge: "bg-secondary-soft text-secondary",
    dot: "bg-secondary",
  },
  customer: {
    label: "Customer",
    badge: "bg-surface-soft text-muted",
    dot: "bg-muted",
  },
};

const NEUTRAL = { badge: "bg-surface-soft text-muted", dot: "bg-muted" };

export default function RoleBadge({ role, className = "" }) {
  const styles = ROLE_STYLES[role] || NEUTRAL;
  const label = styles.label || role;

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
