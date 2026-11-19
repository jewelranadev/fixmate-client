import Container from "@/components/ui/Container";

// Generic public page skeleton: header block + content blocks.
// Route-specific loading files (services, service details) take precedence.
export default function PublicLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-background py-16 lg:py-24"
    >
      <span className="sr-only">Loading page…</span>

      <Container>
        <div className="max-w-3xl space-y-4">
          <div className="h-4 w-28 animate-pulse rounded bg-surface-soft" />
          <div className="h-10 w-full max-w-xl animate-pulse rounded bg-surface-soft" />
          <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-surface-soft" />
          <div className="h-4 w-5/6 max-w-xl animate-pulse rounded bg-surface-soft" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-card border border-border bg-surface"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
