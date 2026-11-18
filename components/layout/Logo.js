// FixMate logo: ember tile with wrench mark + heading-font wordmark.
// Reusable by Navbar/Footer. `onDark` switches the wordmark for navy surfaces.
// (Sidebar.js currently draws its own inline mark — candidate for reuse, see report.)

import Link from "next/link";
import { Wrench } from "lucide-react";

const SIZES = {
  sm: { tile: "size-7 rounded-lg", icon: "size-3.5", text: "text-base" },
  md: { tile: "size-8 rounded-field", icon: "size-4", text: "text-lg" },
};

export default function Logo({
  size = "md",
  onDark = false,
  href = null,
  className = "",
}) {
  const s = SIZES[size] || SIZES.md;
  const content = (
    <>
      <span
        className={`flex shrink-0 items-center justify-center bg-primary ${s.tile}`}
      >
        <Wrench className={`${s.icon} text-white`} aria-hidden="true" />
      </span>
      <span
        className={`font-heading font-bold ${s.text} ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        FixMate
      </span>
    </>
  );
  const classes = `inline-flex h-11 items-center gap-2 ${className}`;
  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  );
}
