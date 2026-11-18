import Card from "@/components/ui/Card";

/**
 * BarChart — dependency-free CSS bar chart. Server component.
 *
 * data: [{ label, value, color? }]
 * Bars scale against the largest value in the set. No animation, no library.
 * Accessibility mirrors DonutChart: visual bars are hidden from assistive
 * tech and the values are exposed as a visually hidden data table.
 */
const DEFAULT_COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-warning)",
  "var(--color-success)",
  "var(--color-danger)",
  "var(--color-muted)",
];

export default function BarChart({
  data = [],
  title = null,
  className = "",
}) {
  const values = data.map((item) => Number(item.value) || 0);
  const max = Math.max(...values, 1);

  const bars = data.map((item, index) => ({
    label: item.label,
    value: Number(item.value) || 0,
    color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      {title && <h2 className="text-lg font-bold text-ink">{title}</h2>}

      {bars.length === 0 ? (
        <p className="mt-4 text-sm text-muted">No data yet.</p>
      ) : (
        <ul aria-hidden="true" className="mt-4 space-y-3.5">
          {bars.map((bar) => (
            <li key={bar.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-muted">
                  {bar.label}
                </span>
                <span className="shrink-0 font-semibold text-foreground">
                  {bar.value}
                </span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface-soft">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(bar.value / max) * 100}%`,
                    backgroundColor: bar.color,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <table className="sr-only">
        <caption>{title || "Chart data"}</caption>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {bars.map((bar) => (
            <tr key={bar.label}>
              <th scope="row">{bar.label}</th>
              <td>{bar.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
