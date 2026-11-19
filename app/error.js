"use client";

import Container from "@/components/ui/Container";
import PageErrorView from "@/components/system/PageErrorView";

// Root error boundary for public routes. `error` is intentionally not read:
// no message, digest, logging or reporting happens anywhere in this file.
// Next 16 made `retry` the stable recovery prop; `reset` stays as a fallback.
export default function Error({ retry, reset }) {
  return (
    <main className="flex min-h-dvh flex-1 items-center bg-background">
      <Container className="py-16">
        <PageErrorView onRetry={retry || reset} />
      </Container>
    </main>
  );
}
