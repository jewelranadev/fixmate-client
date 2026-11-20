"use client";

import ErrorState from "@/components/ui/ErrorState";

/**
 * RetryErrorState — the existing ErrorState with a working retry.
 *
 * ErrorState's retry button is presentational, so this wrapper listens for the
 * click (or keyboard activation) bubbling out of that button and calls
 * `onRetry`. The visual output is unchanged.
 */
export default function RetryErrorState({ onRetry, ...props }) {
  return (
    <div
      onClick={(event) => {
        if (event.target.closest?.("button")) onRetry?.();
      }}
    >
      <ErrorState {...props} />
    </div>
  );
}
