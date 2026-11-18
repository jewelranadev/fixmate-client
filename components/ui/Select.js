/**
 * Select — native dropdown (keeps platform picker behavior + accessibility).
 * Same state model as Input: `error` switches border/focus colors.
 */
const BASE =
  "h-11 w-full rounded-field border bg-surface px-3.5 text-sm text-foreground transition-colors duration-150 disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted";

export default function Select({ error = false, className = "", children, ...rest }) {
  return (
    <select
      className={`${BASE} ${
        error ? "border-danger focus-visible:outline-danger" : "border-border-strong"
      } ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}
