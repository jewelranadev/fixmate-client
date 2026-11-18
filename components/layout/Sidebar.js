// Sidebar panel CONTENT (mark + nav list + user card). Positioning is owned
// by DashboardShell: rendered inside a fixed desktop <aside> and inside the
// mobile drawer. `onNavigate` closes the mobile drawer after a link click;
// `onClose` renders the drawer close button (mobile only).

import Link from "next/link";
import { Wrench, X } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { DASHBOARD_NAV, ROLE_LABELS } from "@/lib/nav/dashboardNav";

export default function Sidebar({
  role,
  pathname,
  user,
  onNavigate,
  onClose,
  closeButtonRef,
}) {
  const links = DASHBOARD_NAV[role] || [];

  return (
    <div className="flex h-full flex-col bg-navy">
      {/* Mark + optional drawer close */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <Link
          href="/"
          className="flex h-11 items-center gap-2 rounded-field font-heading text-lg font-bold text-white"
        >
          <span className="flex size-8 items-center justify-center rounded-field bg-primary">
            <Wrench className="size-4 text-white" aria-hidden="true" />
          </span>
          FixMate
        </Link>
        {onClose && (
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-field text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-primary-bright"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Role navigation */}
      <nav
        aria-label="Dashboard navigation"
        className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
      >
        {links.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex h-11 items-center gap-3 rounded-field px-3 text-sm font-medium transition-colors focus-visible:outline-primary-bright ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section: mock identity card */}
      <div className="shrink-0 border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-field p-2">
          <Avatar name={user.name} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {user.name}
            </p>
            <p className="truncate text-xs text-white/60">{user.email}</p>
            <p className="mt-0.5 text-xs font-semibold text-primary-bright">
              {ROLE_LABELS[role]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
