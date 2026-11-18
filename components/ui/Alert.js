import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

/**
 * Alert — inline message block for success / error / warning / info.
 * Presentational only: pass a title and an optional description.
 * Errors use role="alert" (assertive); everything else is a polite status.
 */

const VARIANTS = {
  success: {
    icon: CircleCheck,
    container: "border-success/30 bg-success-soft",
    iconClass: "text-success",
    role: "status",
  },
  error: {
    icon: CircleAlert,
    container: "border-danger/30 bg-danger-soft",
    iconClass: "text-danger",
    role: "alert",
  },
  warning: {
    icon: TriangleAlert,
    container: "border-warning/30 bg-warning-soft",
    iconClass: "text-warning",
    role: "status",
  },
  info: {
    icon: Info,
    container: "border-info/30 bg-info-soft",
    iconClass: "text-info",
    role: "status",
  },
};

export default function Alert({
  variant = "info",
  title,
  description = null,
  className = "",
}) {
  const styles = VARIANTS[variant] || VARIANTS.info;
  const Icon = styles.icon;

  return (
    <div
      role={styles.role}
      className={`flex items-start gap-3 rounded-card border p-4 ${styles.container} ${className}`}
    >
      <Icon
        className={`mt-0.5 size-5 shrink-0 ${styles.iconClass}`}
        aria-hidden="true"
      />
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description && (
          <div className="text-sm leading-relaxed text-muted">{description}</div>
        )}
      </div>
    </div>
  );
}
