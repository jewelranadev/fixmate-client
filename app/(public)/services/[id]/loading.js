import Container from "@/components/ui/Container";

// Skeleton mirror of the details page: breadcrumb, image, title block,
// details grid, technician card and the sticky request column.
export default function ServiceDetailsLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-background py-8 lg:py-12"
    >
      <span className="sr-only">Loading service details…</span>

      <Container>
        <div className="mb-6 h-4 w-52 animate-pulse rounded bg-surface-soft" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_400px]">
          <div className="space-y-6">
            <div className="aspect-[4/3] w-full animate-pulse rounded-card border border-border bg-surface-soft sm:aspect-[16/9]" />

            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="h-5 w-24 animate-pulse rounded-full bg-surface-soft" />
                <div className="h-5 w-28 animate-pulse rounded-full bg-surface-soft" />
              </div>
              <div className="space-y-2">
                <div className="h-9 w-full max-w-lg animate-pulse rounded bg-surface-soft" />
                <div className="h-9 w-2/3 max-w-sm animate-pulse rounded bg-surface-soft" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-surface-soft" />
                <div className="h-4 w-5/6 max-w-xl animate-pulse rounded bg-surface-soft" />
              </div>
            </div>

            <div className="rounded-card border border-border bg-surface p-5 shadow-xs sm:p-6">
              <div className="h-5 w-32 animate-pulse rounded bg-surface-soft" />
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="size-10 shrink-0 animate-pulse rounded-field bg-surface-soft" />
                    <div className="space-y-2">
                      <div className="h-3 w-28 animate-pulse rounded bg-surface-soft" />
                      <div className="h-4 w-20 animate-pulse rounded bg-surface-soft" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-card border border-border bg-surface p-5 shadow-xs sm:p-6">
              <div className="h-3 w-28 animate-pulse rounded bg-surface-soft" />
              <div className="mt-4 flex items-start gap-4">
                <div className="size-12 shrink-0 animate-pulse rounded-full bg-surface-soft" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-36 animate-pulse rounded bg-surface-soft" />
                  <div className="h-4 w-28 animate-pulse rounded bg-surface-soft" />
                  <div className="h-4 w-full animate-pulse rounded bg-surface-soft" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-surface-soft" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-card border border-border bg-surface p-5 shadow-xs sm:p-6">
              <div className="h-3 w-24 animate-pulse rounded bg-surface-soft" />
              <div className="mt-3 h-10 w-28 animate-pulse rounded bg-surface-soft" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-surface-soft" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-surface-soft" />
              </div>
            </div>

            <div className="rounded-card border border-border bg-surface p-5 shadow-xs sm:p-6">
              <div className="h-6 w-40 animate-pulse rounded bg-surface-soft" />
              <div className="mt-5 space-y-4">
                <div className="h-11 w-full animate-pulse rounded-field bg-surface-soft" />
                <div className="h-11 w-full animate-pulse rounded-field bg-surface-soft" />
                <div className="h-11 w-full animate-pulse rounded-field bg-surface-soft" />
                <div className="h-11 w-full animate-pulse rounded-field bg-surface-soft" />
              </div>
              <div className="mt-5 h-11 w-full animate-pulse rounded-field bg-surface-soft" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
