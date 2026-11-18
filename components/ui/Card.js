/**
 * Card — rounded surface with border + soft navy-tinted shadow.
 * `hover` upgrades the shadow on hover (service cards, list rows).
 * No default padding: compose with utility classes (e.g. `p-6`).
 */
export default function Card({
  as: Tag = "div",
  hover = false,
  className = "",
  children,
}) {
  return (
    <Tag
      className={`rounded-card border border-border bg-surface shadow-xs ${
        hover ? "transition-shadow duration-200 hover:shadow-md" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
