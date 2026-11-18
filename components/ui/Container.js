/**
 * Container — page-width wrapper (A01 §5).
 * Default: 80rem max with 16/24/32px responsive gutters.
 * `narrow`: 48rem max for forms, auth and payment pages.
 */
export default function Container({
  as: Tag = "div",
  narrow = false,
  className = "",
  children,
}) {
  return (
    <Tag
      className={`mx-auto w-full ${
        narrow ? "max-w-3xl" : "max-w-7xl"
      } px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
