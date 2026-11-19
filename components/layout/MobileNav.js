"use client";

// Mobile/tablet (<768px) navigation: hamburger toggles a panel below the bar
// containing the links and auth actions. Interactivity: open/close only
// (click, Escape, link click). No auth logic.

import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut, Menu, UserRound, X } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import NavLinks from "./NavLinks";
import { ROLE_LABELS } from "@/lib/nav/dashboardNav";
import SignOutButton from "@/lib/SignOutButton";

const DASHBOARD_HREFS = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
};

const ROLE_TONES = {
  customer: "info",
  technician: "secondary",
  admin: "primary",
};

export default function MobileNav({ user }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const dashboardHref = DASHBOARD_HREFS[user?.role] || "/dashboard/customer";
  const itemClass =
    "flex h-11 items-center gap-2.5 rounded-field px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-soft";

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="navbar-mobile-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-field text-foreground transition-colors hover:bg-surface-soft"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          id="navbar-mobile-panel"
          className="absolute inset-x-0 top-full space-y-4 border-b border-border bg-surface p-4 shadow-md"
        >
          <NavLinks stacked onNavigate={close} />

          {user ? (
            <div className="space-y-1 border-t border-border pt-4">
              <div className="flex items-center gap-3 px-1 py-1">
                <Avatar name={user.name} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {user.name}
                  </p>
                  <Badge
                    tone={ROLE_TONES[user.role] || "neutral"}
                    className="mt-0.5"
                  >
                    {ROLE_LABELS[user.role] || "User"}
                  </Badge>
                </div>
              </div>
              <Link href={dashboardHref} onClick={close} className={itemClass}>
                <LayoutDashboard
                  className="size-4 text-muted"
                  aria-hidden="true"
                />
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                onClick={close}
                className={itemClass}
              >
                <UserRound className="size-4 text-muted" aria-hidden="true" />
                Update Profile
              </Link>
              {/* VISUAL ONLY: Sign Out is wired during manual integration. */}
              <SignOutButton className="flex h-11 w-full cursor-pointer items-center gap-2.5 rounded-field px-3 text-left text-sm font-medium text-ink hover:bg-surface-soft">
                <LogOut className="size-4" aria-hidden="true" />
                Sign Out
              </SignOutButton>
            </div>
          ) : (
            <div className="flex gap-3 border-t border-border pt-4">
              <Button variant="secondary" href="/sign-in" className="flex-1">
                Sign In
              </Button>
              <Button variant="primary" href="/sign-up" className="flex-1">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
