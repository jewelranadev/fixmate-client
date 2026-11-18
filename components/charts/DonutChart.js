import Card from "@/components/ui/Card";

/**
 * DonutChart — dependency-free inline SVG chart. Server component.
 *
 * data: [{ label, value, color? }]
 * Colors default to the design tokens; pass explicit CSS variable values
 * (e.g. "var(--color-status-requested)") to keep status colors consistent.
 *
 * Accessibility: the visual ring + legend are hidden from assistive tech and
 * the same numbers are exposed as a visually hidden data table.
 */
const DEFAULT_COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-warning)",
  "var(--color-success)",
  "var(--color-danger)",
  "var(--color-muted)",
];

export default function DonutChart({
  data = [],
  title = null,
  size = 176,
  thickness = 18,
  centerLabel = "total",
  className = "",
}) {
  const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const rawSegments = data.map((item, index) => {
    const value = Number(item.value) || 0;
    const length = total > 0 ? (value / total) * circumference : 0;
    return {
      label: item.label,
      value,
      color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      length,
      percent: total > 0 ? Math.round((value / total) * 100) : 0,
    };
  });

  const segments = rawSegments.map((segment, index) => ({
    ...segment,
    offset: rawSegments
      .slice(0, index)
      .reduce((sum, previous) => sum + previous.length, 0),
  }));

  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      {title && <h2 className="text-lg font-bold text-ink">{title}</h2>}

      <div
        aria-hidden="true"
        className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-center"
      >
        <div
          className="relative shrink-0"
          style={{ width: size, height: size }}
        >
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            focusable="false"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--color-surface-soft)"
              strokeWidth={thickness}
            />
            <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              {segments.map((segment) => (
                <circle
                  key={segment.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={thickness}
                  strokeDasharray={`${segment.length} ${
                    circumference - segment.length
                  }`}
                  strokeDashoffset={-segment.offset}
                />
              ))}
            </g>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-2xl font-bold text-ink">
              {total}
            </span>
            <span className="text-xs text-muted">{centerLabel}</span>
          </div>
        </div>

        <ul className="w-full min-w-0 space-y-2">
          {segments.map((segment) => (
            <li
              key={segment.label}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="min-w-0 flex-1 truncate text-muted">
                {segment.label}
              </span>
              <span className="font-semibold text-foreground">
                {segment.value}
              </span>
              <span className="w-10 shrink-0 text-right text-xs text-muted">
                {segment.percent}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <table className="sr-only">
        <caption>{title || "Chart data"}</caption>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((segment) => (
            <tr key={segment.label}>
              <th scope="row">{segment.label}</th>
              <td>{segment.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
