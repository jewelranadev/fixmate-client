/**
 * Switch — accessible on/off control built on a native checkbox.
 * Visual only; persistence wired by owner in M3.
 *
 * The native input keeps keyboard/AT semantics (`role="switch"`,
 * space toggles, checked state) while the track + thumb are pure CSS.
 * The whole label is a >= 44px touch target.
 */
export default function Switch({
  id,
  name,
  label = "Available",
  ariaLabel,
  defaultChecked = false,
  disabled = false,
  className = "",
}) {
  return (
    <label
      className={`flex min-h-11 cursor-pointer select-none items-center gap-3 ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      } ${className}`}
    >
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          role="switch"
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-label={ariaLabel}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="h-6 w-11 rounded-full bg-border-strong transition-colors duration-150 peer-checked:bg-success peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary peer-disabled:opacity-60"
        />
        <span
          aria-hidden="true"
          className="absolute left-0.5 size-5 rounded-full bg-white shadow-xs transition-transform duration-150 peer-checked:translate-x-5"
        />
      </span>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
}
