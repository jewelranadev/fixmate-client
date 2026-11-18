// PLACEHOLDER: replaced in phase A04 with the real designed Footer.
// FixMate name + one line of text + copyright.

import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="space-y-1 py-8 text-center">
        <p className="font-heading text-sm font-bold text-ink">FixMate</p>
        <p className="text-sm text-muted">
          On-demand repair booking for smart devices and home appliances.
        </p>
        <p className="text-xs text-muted">
          {/* Static year: `new Date()` is an unstable value during prerender
              under cacheComponents and fails `next build` (caught in A03). */}
          © 2026 FixMate. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
