"use client";

// Logged-in profile dropdown: avatar + name + role badge trigger, panel with
// name/email, Dashboard (role-correct), Update Profile, and a VISUAL-ONLY
// Sign Out item. Open/close is the only interactivity (click, Escape,
// outside click). No auth, no sessions, no redirects.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { ROLE_LABELS } from "@/lib/nav/dashboardNav";

const DASHBOARD_HREFS = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
};

const ROLE_TONES = { customer: "info", technician: "secondary", admin: "primary" };

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  // Escape closes (and restores focus to the trigger); outside click closes.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      const target = event.target;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const dashboardHref = DASHBOARD_HREFS[user.role] || "/dashboard/customer";
  const itemClass =
    "flex h-11 items-center gap-2.5 rounded-field px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-soft";

  return (
    <div className="relative">
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="navbar-user-menu"
        className="flex h-11 items-center gap-2 rounded-field pl-1 pr-2 transition-colors hover:bg-surface-soft"
      >
        <Avatar name={user.name} size="sm" />
        <span className="hidden max-w-28 truncate text-sm font-medium text-foreground md:block">
          {user.name}
        </span>
        <Badge tone={ROLE_TONES[user.role] || "neutral"}>
          {ROLE_LABELS[user.role] || "User"}
        </Badge>
        <ChevronDown
          className={`size-4 text-muted transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="navbar-user-menu"
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-card border border-border bg-surface p-2 shadow-md"
        >
          <div className="border-b border-border px-3 pb-3 pt-2">
            <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
            {user.email && (
              <p className="mt-0.5 truncate text-xs text-muted">{user.email}</p>
            )}
          </div>
          <div className="space-y-1 pt-2">
            <Link
              role="menuitem"
              href={dashboardHref}
              onClick={close}
              className={itemClass}
            >
              <LayoutDashboard className="size-4 text-muted" aria-hidden="true" />
              Dashboard
            </Link>
            <Link
              role="menuitem"
              href="/dashboard/profile"
              onClick={close}
              className={itemClass}
            >
              <UserRound className="size-4 text-muted" aria-hidden="true" />
              Update Profile
            </Link>
            {/* VISUAL ONLY: Sign Out is wired during manual integration. */}
            <button
              type="button"
              role="menuitem"
              aria-disabled="true"
              title="Wired during manual integration"
              className="flex h-11 w-full cursor-not-allowed items-center gap-2.5 rounded-field px-3 text-left text-sm font-medium text-muted"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
