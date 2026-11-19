// Route-level skeleton for the profile page: identity card + edit form card.
export default function ProfileLoading() {
  return (
    <div role="status" aria-live="polite" className="space-y-8">
      <span className="sr-only">Loading your profile…</span>

      <div className="space-y-2">
        <div className="h-8 w-56 animate-pulse rounded bg-surface-soft" />
        <div className="h-4 w-full max-w-md animate-pulse rounded bg-surface-soft" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start">
        <div className="rounded-card border border-border bg-surface p-6 shadow-xs">
          <div className="mx-auto size-12 animate-pulse rounded-full bg-surface-soft" />
          <div className="mx-auto mt-4 h-5 w-40 animate-pulse rounded bg-surface-soft" />
          <div className="mx-auto mt-2 h-4 w-48 animate-pulse rounded bg-surface-soft" />
          <div className="mx-auto mt-3 h-6 w-24 animate-pulse rounded-full bg-surface-soft" />
          <div className="mt-6 space-y-3 border-t border-border pt-4">
            <div className="h-4 w-full animate-pulse rounded bg-surface-soft" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-surface-soft" />
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface p-6 shadow-xs">
          <div className="h-5 w-40 animate-pulse rounded bg-surface-soft" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-surface-soft" />
                <div className="h-11 w-full animate-pulse rounded-field bg-surface-soft" />
              </div>
            ))}
            <div className="space-y-2 sm:col-span-2">
              <div className="h-4 w-16 animate-pulse rounded bg-surface-soft" />
              <div className="h-28 w-full animate-pulse rounded-field bg-surface-soft" />
            </div>
            <div className="h-32 w-full animate-pulse rounded-card bg-surface-soft sm:col-span-2" />
          </div>
          <div className="mt-6 flex justify-end border-t border-border pt-5">
            <div className="h-11 w-36 animate-pulse rounded-field bg-surface-soft" />
          </div>
        </div>
      </div>
    </div>
  );
}
