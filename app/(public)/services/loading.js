import Container from "@/components/ui/Container";
import { ServiceCardSkeleton } from "@/components/shared/ServiceCard";

// Skeleton mirrors the page: header block, filter bar block, result line,
// then eight cards in the exact same grid classes as ServicesGrid.
export default function ServicesLoading() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading services…</span>

      <section className="border-b border-border bg-surface py-12 lg:py-16">
        <Container>
          <div className="h-3 w-16 animate-pulse rounded bg-surface-soft" />
          <div className="mt-4 h-9 w-80 max-w-full animate-pulse rounded bg-surface-soft" />
          <div className="mt-5 space-y-2.5">
            <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-surface-soft" />
            <div className="h-4 w-2/3 max-w-xl animate-pulse rounded bg-surface-soft" />
          </div>
        </Container>
      </section>

      <section className="bg-background py-10 lg:py-14">
        <Container className="space-y-6">
          <div className="rounded-card border border-border bg-surface p-4 shadow-xs sm:p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,0.9fr))_auto] lg:items-end">
              <div className="space-y-1.5 md:col-span-4 lg:col-span-1">
                <div className="h-3 w-14 animate-pulse rounded bg-surface-soft" />
                <div className="h-11 w-full animate-pulse rounded-field bg-surface-soft" />
              </div>
              {[0, 1, 2].map((index) => (
                <div key={index} className="space-y-1.5">
                  <div className="h-3 w-16 animate-pulse rounded bg-surface-soft" />
                  <div className="h-11 w-full animate-pulse rounded-field bg-surface-soft" />
                </div>
              ))}
              <div className="flex gap-2">
                <div className="h-11 flex-1 animate-pulse rounded-field bg-surface-soft lg:w-24 lg:flex-none" />
                <div className="h-11 flex-1 animate-pulse rounded-field bg-surface-soft lg:w-20 lg:flex-none" />
              </div>
            </div>
          </div>

          <div className="h-4 w-40 animate-pulse rounded bg-surface-soft" />

          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
