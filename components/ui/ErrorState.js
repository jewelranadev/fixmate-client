import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * ErrorState — inline error presentation for a dashboard section.
 * Presentational only: the retry button has no handler.
 * Wired by owner (data refetch / retry handler).
 */
export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this section. Please try again.",
  actionLabel = "Try again",
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`rounded-modal border border-border bg-surface px-6 py-14 text-center ${className}`}
    >
      <div className="mx-auto flex max-w-md flex-col items-center">
        <span className="flex size-14 items-center justify-center rounded-modal bg-danger-soft text-danger">
          <TriangleAlert className="size-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        {/* Wired by owner. This button has no logic in the UI phase. */}
        <Button type="button" className="mt-6">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
