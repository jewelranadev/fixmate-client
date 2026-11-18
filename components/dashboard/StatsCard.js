import Card from "@/components/ui/Card";

/**
 * StatsCard — one dashboard metric. Server component, props-driven.
 * `tone` picks the icon tile tint from the semantic token pairs.
 */
const TONES = {
  primary: "bg-primary-soft text-primary",
  secondary: "bg-secondary-soft text-secondary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-soft text-muted",
};

export default function StatsCard({
  icon: Icon = null,
  label,
  value,
  hint = null,
  tone = "primary",
  className = "",
}) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            {label}
          </p>
          <p className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
        </div>
        {Icon && (
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-field ${
              TONES[tone] || TONES.primary
            }`}
          >
            <Icon className="size-5" aria-hidden="true" />
          </span>
        )}
      </div>
    </Card>
  );
}
