import Link from "next/link";
import { User, Wrench } from "lucide-react";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import PasswordField from "@/components/auth/PasswordField";

/**
 * SignUpForm — presentation only.
 *
 * No validation, no auth call, no redirect, no toast. Every error, alert and
 * loading state below is driven by props so the owner can wire BetterAuth in
 * the manual phases. There is deliberately no Admin role option.
 */

const ROLES = [
  {
    value: "customer",
    title: "Customer",
    description: "Book repairs and track every step.",
    Icon: User,
  },
  {
    value: "technician",
    title: "Technician",
    description: "Offer repairs and manage your jobs.",
    Icon: Wrench,
  },
];

const PASSWORD_RULES = [
  "At least 6 characters",
  "One uppercase letter",
  "One lowercase letter",
];

export default function SignUpForm({
  errors = {},
  status = "idle",
  message = "",
  isSubmitting = false,
}) {
  // Unique ids keep repeated preview instances (idle / error / success /
  // submitting) from colliding on the temporary design-preview page.
  const uid = `signup-${status}-${
    Object.keys(errors).length ? "errors" : "clean"
  }-${isSubmitting ? "loading" : "idle"}`;

  const shownMessage = status !== "idle" && message ? message : null;
  const passwordDescribedBy = [
    errors.password ? `${uid}-password-error` : null,
    `${uid}-password-hint`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-6">
      <form noValidate className="space-y-5">
        {/*
          Native submission guard. Pressing Enter fires a click on the form's
          default (first submit) button — this one is permanently disabled, so
          the form can never submit natively and the password never hits the URL.
        */}
        <button
          type="submit"
          disabled
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        >
          Submit
        </button>

        {shownMessage && (
          <Alert
            variant={status === "success" ? "success" : "error"}
            title={shownMessage}
          />
        )}

        <Field
          label="Full Name"
          htmlFor={`${uid}-name`}
          error={errors.name}
        >
          <Input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Sarah Ahmed"
            error={Boolean(errors.name)}
            disabled={isSubmitting}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          />
        </Field>

        <Field label="Email" htmlFor={`${uid}-email`} error={errors.email}>
          <Input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={Boolean(errors.email)}
            disabled={isSubmitting}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
          />
        </Field>

        <div>
          <Field
            label="Password"
            htmlFor={`${uid}-password`}
            error={errors.password}
          >
            <PasswordField
              id={`${uid}-password`}
              name="password"
              autoComplete="new-password"
              placeholder="Create a password"
              error={Boolean(errors.password)}
              disabled={isSubmitting}
              describedBy={passwordDescribedBy}
            />
          </Field>
          <ul id={`${uid}-password-hint`} className="mt-2 space-y-1">
            {PASSWORD_RULES.map((rule) => (
              <li
                key={rule}
                className="flex items-center gap-2 text-xs text-muted"
              >
                <span
                  aria-hidden="true"
                  className="size-1 shrink-0 rounded-full bg-muted"
                />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <fieldset
          aria-describedby={errors.role ? `${uid}-role-error` : undefined}
        >
          <legend className="mb-1.5 text-sm font-medium text-foreground">
            Account type
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {ROLES.map(({ value, title, description, Icon }) => (
              <label
                key={value}
                className="group relative flex cursor-pointer items-start gap-3 rounded-card border border-border-strong bg-surface p-4 transition-colors duration-150 hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary-soft/50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="role"
                  value={value}
                  defaultChecked={value === "customer"}
                  disabled={isSubmitting}
                  className="peer sr-only"
                />
                <span className="flex size-10 shrink-0 items-center justify-center rounded-field bg-surface-soft text-muted transition-colors duration-150 group-has-[:checked]:bg-primary group-has-[:checked]:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    {description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface transition-colors duration-150 group-has-[:checked]:border-primary"
                >
                  <span className="size-2.5 rounded-full bg-transparent transition-colors duration-150 group-has-[:checked]:bg-primary" />
                </span>
              </label>
            ))}
          </div>
          {errors.role && (
            <p id={`${uid}-role-error`} className="mt-1.5 text-xs text-danger">
              {errors.role}
            </p>
          )}
        </fieldset>

        {/* Wired by owner in manual phases M1/M13 (BetterAuth sign-up, validation, toasts, redirect). No auth logic here. */}
        <Button
          type="button"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Create account
        </Button>
      </form>

      <p className="border-t border-border pt-5 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
