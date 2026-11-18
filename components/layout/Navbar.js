// PLACEHOLDER: replaced in phase A04 with the real designed Navbar.
// Simple bar: FixMate wordmark + three links + Sign In link.

import Link from "next/link";
import { Wrench } from "lucide-react";
import Container from "@/components/ui/Container";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex h-11 items-center gap-2 rounded-field font-heading text-lg font-bold text-ink"
        >
          <span className="flex size-8 items-center justify-center rounded-field bg-primary">
            <Wrench className="size-4 text-white" aria-hidden="true" />
          </span>
          FixMate
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-11 items-center rounded-field px-2 text-sm font-medium text-muted transition-colors hover:text-foreground sm:px-3"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sign-in"
            className="inline-flex h-11 items-center rounded-field px-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover sm:px-3"
          >
            Sign In
          </Link>
        </nav>
      </Container>
    </header>
  );
}
