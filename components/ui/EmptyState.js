import Button from "@/components/ui/Button";

/**
 * EmptyState — reusable centered placeholder (services, bookings, requests…).
 * Presentational only: `icon` is a lucide component, `action` is
 * { label, href } and renders as a primary button.
 */

export default function EmptyState({
  icon: Icon = null,
  title,
  description,
  action = null,
  className = "",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-modal border border-border bg-surface px-6 py-16 text-center ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto flex max-w-md flex-col items-center">
        {Icon && (
          <span className="flex size-14 items-center justify-center rounded-modal bg-primary-soft text-primary">
            <Icon className="size-7" aria-hidden="true" />
          </span>
        )}
        <h2 className="mt-5 text-xl font-bold">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-muted">{description}</p>
        )}
        {action && (
          <Button href={action.href} className="mt-6">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
