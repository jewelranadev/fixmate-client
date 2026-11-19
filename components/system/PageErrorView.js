import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * PageErrorView — friendly fallback for unexpected render errors.
 * Never renders error.message / error.digest and never logs or reports
 * anything. `onRetry` is optional; without it the button stays inert.
 * `showHome` adds the public "Back to Home" link; the dashboard variant
 * turns it off because the role is unknown there.
 */
export default function PageErrorView({
  onRetry,
  showHome = true,
  compact = false,
  headingLevel = "h1",
}) {
  const Heading = headingLevel;

  return (
    <div
      role="alert"
      className={`rounded-modal border border-border bg-surface text-center shadow-xs ${
        compact ? "px-5 py-10" : "px-6 py-14"
      }`}
    >
      <div className="mx-auto flex max-w-md flex-col items-center">
        <span
          className={`flex items-center justify-center rounded-modal bg-danger-soft text-danger ${
            compact ? "size-12" : "size-14"
          }`}
        >
          <TriangleAlert
            className={compact ? "size-6" : "size-7"}
            aria-hidden="true"
          />
        </span>
        <Heading
          className={`mt-5 font-bold text-ink ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          Something went wrong
        </Heading>
        <p
          className={`mt-2 leading-relaxed text-muted ${
            compact ? "text-sm" : "text-base"
          }`}
        >
          We ran into an unexpected problem while loading this page. Nothing
          you were working on has been changed.
        </p>
        <div
          className={`flex flex-col gap-3 sm:flex-row ${
            compact ? "mt-6" : "mt-8"
          }`}
        >
          <Button type="button" onClick={onRetry || undefined}>
            Try again
          </Button>
          {showHome && (
            <Button
              href="/"
              variant="ghost"
              className="border border-border-strong"
            >
              Back to Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
