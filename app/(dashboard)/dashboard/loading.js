// Generic dashboard content skeleton. The DashboardShell chrome stays mounted;
// route-specific loading files (admin, customer, technician, profile) take
// precedence for their own segments.
export default function DashboardLoading() {
  return (
    <div role="status" aria-live="polite" className="space-y-6">
      <span className="sr-only">Loading dashboard…</span>

      <div className="space-y-2">
        <div className="h-8 w-56 animate-pulse rounded bg-surface-soft" />
        <div className="h-4 w-full max-w-md animate-pulse rounded bg-surface-soft" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-card border border-border bg-surface"
          />
        ))}
      </div>

      <div className="rounded-card border border-border bg-surface p-5 shadow-xs">
        <div className="h-5 w-40 animate-pulse rounded bg-surface-soft" />
        <div className="mt-5 space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-12 w-full animate-pulse rounded bg-surface-soft"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
