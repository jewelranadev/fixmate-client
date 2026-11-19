"use client";

import PageErrorView from "@/components/system/PageErrorView";

// Dashboard error boundary. It renders inside DashboardShell, so the padding
// comes from the shell and the fallback stays compact. The role is unknown
// here, so there is no "Back to Home" link — only "Try again".
export default function DashboardError({ retry, reset }) {
  return <PageErrorView onRetry={retry || reset} showHome={false} compact />;
}
