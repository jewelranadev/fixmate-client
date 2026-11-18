// Deterministic display formatters. No Date object is used anywhere here so
// output is identical on the server and the client (cacheComponents-safe).

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Format "YYYY-MM-DD" (or an ISO timestamp) as "Nov 22, 2026".
 * Splits the string instead of parsing it into a Date.
 */
export function formatDate(isoDate) {
  if (!isoDate || typeof isoDate !== "string") return "—";

  const [datePart] = isoDate.split("T");
  const [year, month, day] = datePart.split("-");
  const monthName = MONTHS[Number(month) - 1];

  if (!year || !monthName || !day) return isoDate;

  return `${monthName} ${Number(day)}, ${year}`;
}

/** Format a USD amount as "$1,234.50" style output (two decimals, no locale APIs). */
export function formatCurrency(amount, currency = "usd") {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "—";

  const fixed = value.toFixed(2);
  const [whole, decimals] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const symbol = currency === "usd" ? "$" : "";

  return `${symbol}${grouped}.${decimals}`;
}
