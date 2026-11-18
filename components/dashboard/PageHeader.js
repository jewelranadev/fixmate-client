/**
 * PageHeader — dashboard page title row.
 * `actions` renders on the right on >= sm and below the title on mobile.
 * Presentational only.
 */
export default function PageHeader({
  title,
  description = null,
  actions = null,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${className}`}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
