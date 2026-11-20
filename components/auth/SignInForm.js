"use client";

import Link from "next/link";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import PasswordField from "@/components/auth/PasswordField";

/**
 * SignInForm — presentation only.
 *
 * No validation, no auth call, no redirect. Alerts and loading come from
 * props. Deliberately no "remember me", "forgot password" or social login,
 * because none of those are part of the assignment.
 */
export default function SignInForm({
  errors = {},
  status = "idle",
  message = "",
  isSubmitting = false,
  onSubmit,
}) {
  const uid = `signin-${status}-${
    Object.keys(errors).length ? "errors" : "clean"
  }-${isSubmitting ? "loading" : "idle"}`;

  const shownMessage = status !== "idle" && message ? message : null;
  const passwordDescribedBy = errors.password
    ? `${uid}-password-error`
    : undefined;

  return (
    <div className="space-y-6">
      <form
        noValidate
        className="space-y-5"
        onSubmit={onSubmit ?? ((event) => event.preventDefault())}
      >
        {shownMessage && (
          <Alert
            variant={status === "success" ? "success" : "error"}
            title={shownMessage}
          />
        )}

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

        <Field
          label="Password"
          htmlFor={`${uid}-password`}
          error={errors.password}
        >
          <PasswordField
            id={`${uid}-password`}
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            error={Boolean(errors.password)}
            disabled={isSubmitting}
            describedBy={passwordDescribedBy}
          />
        </Field>

        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Sign in
        </Button>
      </form>

      <p className="border-t border-border pt-5 text-center text-sm text-muted">
        New to FixMate?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
