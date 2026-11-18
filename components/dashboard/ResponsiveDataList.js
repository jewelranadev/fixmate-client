/**
 * ResponsiveDataList — one dataset, two presentations.
 *
 * >= md: a real <table> (aria-label, scope on every header) inside an
 *        overflow-safe wrapper, with header styling and row hover.
 * <  md: a stacked card list built from `renderCard(row)`.
 *
 * No sorting, filtering, fetching or state. `empty` and `loading` are slots
 * so each dashboard can supply its own empty state and skeleton.
 *
 * columns: [{ key, header, render?, className?, headerClassName? }]
 */
export default function ResponsiveDataList({
  label,
  columns,
  rows = [],
  rowKey = (row, index) => row?._id ?? index,
  renderCard,
  empty = null,
  loading = false,
  skeletonRows = 5,
  minWidthClass = "min-w-[720px]",
  className = "",
}) {
  const isEmpty = !loading && rows.length === 0;

  if (isEmpty) {
    return <div className={className}>{empty}</div>;
  }

  return (
    <div className={className}>
      {/* Desktop / tablet */}
      <div className="hidden overflow-hidden rounded-card border border-border bg-surface shadow-xs md:block">
        <div className="overflow-x-auto">
          <table
            aria-label={label}
            className={`w-full ${minWidthClass} border-collapse text-left text-sm`}
          >
            <thead className="border-b border-border bg-surface-soft">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted ${
                      column.headerClassName || ""
                    }`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading
                ? Array.from({ length: skeletonRows }).map((_, index) => (
                    <tr key={`skeleton-${index}`}>
                      {columns.map((column) => (
                        <td key={column.key} className="px-4 py-4">
                          <div className="h-4 w-full max-w-32 animate-pulse rounded bg-surface-soft" />
                        </td>
                      ))}
                    </tr>
                  ))
                : rows.map((row, index) => (
                    <tr
                      key={rowKey(row, index)}
                      className="transition-colors duration-150 hover:bg-surface-soft/70"
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={`px-4 py-4 align-middle ${
                            column.className || ""
                          }`}
                        >
                          {column.render
                            ? column.render(row)
                            : (row[column.key] ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <ul className="space-y-3 md:hidden">
        {loading
          ? Array.from({ length: skeletonRows }).map((_, index) => (
              <li key={`skeleton-${index}`}>
                <div className="h-36 animate-pulse rounded-card border border-border bg-surface" />
              </li>
            ))
          : rows.map((row, index) => (
              <li
                key={rowKey(row, index)}
                className="rounded-card border border-border bg-surface p-4 shadow-xs"
              >
                {renderCard(row)}
              </li>
            ))}
      </ul>
    </div>
  );
}
