// Public Footer — navy, 4/2/1 column grid.
// Contact details are CLEARLY FAKE placeholders; social links point to "#"
// and are marked as placeholders. Brand marks (Facebook, Instagram, LinkedIn,
// X) are drawn inline — no icon packages. Static year only (no `new Date()`:
// unstable under cacheComponents, caught in A03).

import Container from "@/components/ui/Container";
import Logo from "./Logo";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

// PLACEHOLDER LINKS: real social profiles are added at launch; href="#".
function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function XMark() {
  // Modern X logo (not the old Twitter bird).
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "FixMate on Facebook (placeholder link)", Mark: FacebookMark },
  { label: "FixMate on Instagram (placeholder link)", Mark: InstagramMark },
  { label: "FixMate on LinkedIn (placeholder link)", Mark: LinkedInMark },
  { label: "FixMate on X (placeholder link)", Mark: XMark },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
];

// Category hrefs are pre-encoded static strings (visual links only; the
// ?category filter is wired during manual integration).
const CATEGORIES = [
  { label: "Smartphone", href: "/services?category=Smartphone" },
  { label: "Laptop & PC", href: "/services?category=Laptop%20%26%20PC" },
  { label: "AC", href: "/services?category=AC" },
  { label: "Refrigerator", href: "/services?category=Refrigerator" },
  { label: "TV", href: "/services?category=TV" },
  { label: "Washing Machine", href: "/services?category=Washing%20Machine" },
  { label: "Electrical", href: "/services?category=Electrical" },
];

const linkClass =
  "inline-flex h-11 items-center text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-primary-bright";

const columnTitleClass =
  "font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white";

function ColumnTitle({ children }) {
  return <h3 className={columnTitleClass}>{children}</h3>;
}

export default function Footer() {
  return (
    <footer className="bg-navy">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: brand */}
          <div className="space-y-4">
            <Logo onDark href="/" />
            <p className="text-sm font-medium text-white">
              Verified technicians. Honest prices. Pay after the repair.
            </p>
            <p className="text-sm text-white/60">
              FixMate connects you with trusted local experts for smartphones,
              laptops, home appliances and electrical work — booked in minutes,
              tracked to the done.
            </p>
          </div>

          {/* Column 2: quick links */}
          <div className="space-y-2">
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="space-y-0.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: categories */}
          <div className="space-y-2">
            <ColumnTitle>Popular Categories</ColumnTitle>
            <ul className="space-y-0.5">
              {CATEGORIES.map((category) => (
                <li key={category.label}>
                  <Link href={category.href} className={linkClass}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: contact + socials — CLEARLY FAKE placeholder details,
              replaced with real support contacts during integration */}
          <div className="space-y-2">
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="space-y-0.5">
              <li>
                <a href="mailto:support@fixmate.example" className={linkClass}>
                  <Mail className="mr-2 size-4 shrink-0" aria-hidden="true" />
                  support@fixmate.example
                </a>
              </li>
              <li>
                <a href="tel:+000000000000" className={linkClass}>
                  <Phone className="mr-2 size-4 shrink-0" aria-hidden="true" />
                  +000 0000 000000
                </a>
              </li>
              <li>
                <span className="inline-flex items-start py-2.5 text-sm text-white/70">
                  <MapPin className="mr-2 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  123 Placeholder Street, Suite 000, Fictional City
                </span>
              </li>
            </ul>
            <div className="flex items-center gap-1 pt-2">
              {SOCIALS.map(({ label, Mark }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-field text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-primary-bright"
                >
                  <Mark />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/60">
            © 2026 FixMate. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
