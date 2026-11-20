// Public route group layout: Navbar + content + Footer.
// Dashboard routes live in app/(dashboard) and do NOT get this chrome.

import Footer from "@/components/layout/Footer";
import SessionNavbar from "@/components/layout/SessionNavbar";
import { Suspense } from "react";

export default function PublicLayout({ children }) {
  return (
    <>
      <Suspense
        fallback={
          <div
            className="h-16 border-b border-border bg-surface"
            aria-hidden="true"
          />
        }
      >
        <SessionNavbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
