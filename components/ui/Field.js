import Label from "./Label";

/**
 * Field — composition wrapper for a labeled control with helper/error text.
 * Pure layout + text rendering; the control itself is passed as `children`.
 * Error text gets an id (`${htmlFor}-error`) so callers can wire
 * aria-describedby when integrating real validation later.
 */
export default function Field({
  label,
  htmlFor,
  helper,
  error,
  required = false,
  className = "",
  children,
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : helper ? (
        <p id={`${htmlFor}-helper`} className="text-xs text-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
