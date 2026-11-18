/**
 * Label — form field label. `required` renders a visual asterisk
 * (pair with the HTML required attribute on the control itself).
 */
export default function Label({
  required = false,
  className = "",
  children,
  ...rest
}) {
  return (
    <label
      className={`block text-sm font-medium text-foreground ${className}`}
      {...rest}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-danger" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
