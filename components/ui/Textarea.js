/**
 * Textarea — multi-line text field. Same state model as Input.
 */
const BASE =
  "min-h-24 w-full rounded-field border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-placeholder transition-colors duration-150 read-only:bg-surface-soft disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted";

export default function Textarea({ error = false, className = "", ...rest }) {
  return (
    <textarea
      className={`${BASE} ${
        error ? "border-danger focus-visible:outline-danger" : "border-border-strong"
      } ${className}`}
      {...rest}
    />
  );
}
