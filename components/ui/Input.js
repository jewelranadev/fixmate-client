/**
 * Input — single-line text field.
 * States are handled with native pseudo-classes where possible:
 * :focus-visible via the global ring, :disabled, :read-only via utilities.
 * Pass `error` to switch the border + focus color to danger.
 * No state, no handlers — all behavior comes from the caller.
 */

const BASE =
  "h-11 w-full rounded-field border bg-surface px-3.5 text-sm text-foreground placeholder:text-placeholder transition-colors duration-150 read-only:bg-surface-soft disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted";

export default function Input({ error = false, className = "", ...rest }) {
  return (
    <input
      className={`${BASE} ${
        error ? "border-danger focus-visible:outline-danger" : "border-border-strong"
      } ${className}`}
      {...rest}
    />
  );
}
