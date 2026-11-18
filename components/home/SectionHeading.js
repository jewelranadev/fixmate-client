// Shared section header so every home section keeps the same rhythm:
// small ember eyebrow, h2, muted description, optional action on the right.

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8 ${className}`}
    >
      <div className="max-w-2xl space-y-3">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {eyebrow}
          </p>
        )}
        <h2>{title}</h2>
        {description && (
          <p className="text-base text-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
