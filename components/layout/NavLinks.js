"use client";

// The three public links with active state (needs usePathname).
// `stacked` renders the vertical variant used in the mobile panel;
// `onNavigate` lets the mobile panel close itself after a link click.

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function NavLinks({ stacked = false, onNavigate }) {
  const pathname = usePathname();
  const base = `h-11 items-center rounded-field px-3 text-sm transition-colors focus-visible:outline-primary ${
    stacked ? "flex" : "inline-flex"
  } font-medium`;

  return (
    <nav
      aria-label="Main navigation"
      className={stacked ? "space-y-1" : "flex items-center gap-1"}
    >
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`${base} ${
              active
                ? "bg-primary-soft font-semibold text-primary-hover"
                : "text-muted hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
