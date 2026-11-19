"use client";

// DashboardShell — sidebar + top bar chrome for all /dashboard routes.
// The ONLY interactivity here is the mobile drawer open/close state
// (open button, overlay click, close button, Escape, link click, focus move).
// Role/user come from the TEMPORARY mock helper (replaced in M13);
// children stay server-rendered — no dynamic APIs are used.

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { DASHBOARD_NAV } from "@/lib/nav/dashboardNav";
import { roleFromPathname } from "@/lib/mock/mockRole";
import { useAuthUser } from "@/lib/use-auth-user";
export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  const role = roleFromPathname(pathname);
  const { user } = useAuthUser();
  const links = DASHBOARD_NAV[role] || [];
  const activeLink = links.find((link) => link.href === pathname);
  const title = activeLink ? activeLink.label : "Dashboard";

  const close = () => setOpen(false);

  // Escape-to-close for the drawer.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#dashboard-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-field focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to dashboard content
      </a>

      {/* Desktop: fixed 256px navy sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64">
        <Sidebar role={role} pathname={pathname} user={user} />
      </aside>

      {/* Mobile/tablet: off-canvas drawer (stays mounted for the slide
          transition; `inert` removes it from tab order when closed) */}
      <div
        id="dashboard-drawer"
        className={`fixed inset-0 z-50 lg:hidden ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard menu"
          aria-hidden={!open}
          inert={!open}
          className="absolute inset-0"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            tabIndex={-1}
            className={`absolute inset-0 h-full w-full bg-ink/60 transition-opacity duration-200 focus-visible:outline-primary-bright ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`absolute inset-y-0 left-0 w-64 max-w-[85%] shadow-lg transition-transform duration-200 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar
              role={role}
              pathname={pathname}
              user={user}
              onNavigate={close}
              onClose={close}
              closeButtonRef={closeButtonRef}
            />
          </div>
        </div>
      </div>

      {/* Main column */}
      <div className="flex min-h-dvh flex-col lg:pl-64">
        <Topbar
          title={title}
          user={user}
          role={role}
          menuOpen={open}
          onMenuOpen={() => setOpen(true)}
        />
        <main id="dashboard-content" className="flex-1">
          {/* Full-width content: no max-width cap, only comfortable gutters. */}
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
