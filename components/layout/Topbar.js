// Top bar: hamburger (mobile), page-area title slot, and the mock profile
// cluster (avatar + name + role badge + Update Profile link + visual-only
// Sign Out item). Pure rendering — state lives in DashboardShell.

import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { ROLE_LABELS } from "@/lib/nav/dashboardNav";

const ROLE_TONES = { customer: "info", technician: "secondary", admin: "primary" };

export default function Topbar({ title, user, role, menuOpen, onMenuOpen }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="flex h-16 items-center gap-2 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
          aria-controls="dashboard-drawer"
          aria-expanded={menuOpen}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-field text-foreground transition-colors hover:bg-surface-soft lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>

        <p className="min-w-0 truncate font-heading text-base font-semibold text-ink">
          {title}
        </p>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2.5 sm:flex">
            <Avatar name={user.name} size="sm" />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <Badge tone={ROLE_TONES[role] || "neutral"} className="mt-0.5">
                {ROLE_LABELS[role] || "User"}
              </Badge>
            </div>
          </div>

          <span
            className="hidden h-6 w-px bg-border sm:block"
            aria-hidden="true"
          />

          <Link
            href="/dashboard/profile"
            className="inline-flex h-11 items-center rounded-field px-2 text-sm font-medium text-secondary transition-colors hover:text-secondary-hover"
          >
            Update Profile
          </Link>

          {/* Non-functional visual item — Sign Out is wired during integration */}
          <span
            aria-disabled="true"
            title="Sign Out becomes functional after integration"
            className="hidden h-11 cursor-default items-center gap-1.5 rounded-field px-2 text-sm font-medium text-muted sm:inline-flex"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign Out
          </span>
        </div>
      </div>
    </header>
  );
}
