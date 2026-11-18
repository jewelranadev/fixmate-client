import Link from "next/link";
import { Loader2 } from "lucide-react";

/**
 * Button — presentational only (no state, no handlers bundled).
 * Renders a <button> by default, or a Next <Link> when `href` is given.
 * Variants/sizes per A01 §5. Focus ring comes from the global :focus-visible rule.
 */

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-navy text-white hover:bg-ink",
  ghost: "bg-transparent text-foreground hover:bg-surface-soft",
  destructive: "bg-danger text-white hover:bg-danger-hover",
};

const SIZES = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  loading = false,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-field font-semibold",
    "transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    className,
  ].join(" ");

  const content = (
    <>
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} ${disabled ? "pointer-events-none opacity-50" : ""}`}
        aria-disabled={disabled || undefined}
        aria-busy={loading || undefined}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}
