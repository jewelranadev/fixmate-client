import Link from "next/link";
import { Lock, Send } from "lucide-react";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

/**
 * RequestRepairPanel — the request experience for one service.
 *
 * Presentational only: no "use client", no session checks, no role
 * detection, no validation and no submit logic. Which experience renders
 * is decided entirely by the `variant` prop; the owner wires real data,
 * validation and booking creation in the manual phases.
 *
 * Variants:
 *   guest      — locked state + sign-in call to action
 *   customer   — always-visible request form with inline error / status states
 *   technician — disabled request button + notice (no form)
 *   admin      — disabled request button + notice (no form)
 */

const MOCK_CUSTOMER = {
  name: "Sarah Ahmed",
  email: "sarah.ahmed@fixmate.example",
};

export default function RequestRepairPanel({
  variant = "guest",
  serviceId,
  serviceTitle,
  errors = {},
  status = "idle",
  defaults = {},
}) {
  const customer = {
    name: defaults.name ?? MOCK_CUSTOMER.name,
    email: defaults.email ?? MOCK_CUSTOMER.email,
  };

  // Unique DOM ids keep labels/errors bound when several panels are shown
  // side by side on the temporary design-preview page.
  const uid = `repair-${variant}-${status}-${
    Object.keys(errors).length ? "errors" : "clean"
  }`;
  const headingId = `${uid}-heading`;

  return (
    <Card className="p-5 sm:p-6">
      <div>
        <h2 id={headingId} className="text-lg font-bold">
          Request a repair
        </h2>
        {serviceTitle && (
          <p className="mt-1 line-clamp-1 text-sm text-muted">{serviceTitle}</p>
        )}
      </div>

      {variant === "guest" && (
        <div className="mt-5 space-y-4">
          <span className="flex size-11 items-center justify-center rounded-field bg-surface-soft text-muted">
            <Lock className="size-5" aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-muted">
            Sign in to send a request for{" "}
            <span className="font-semibold text-foreground">
              {serviceTitle}
            </span>
            . You&apos;ll choose a preferred date and describe the problem
            before sending.
          </p>
          {/* The exact query param is decided by the owner during auth integration. */}
          <Button
            href={`/sign-in?redirect=/services/${serviceId}`}
            className="w-full"
          >
            Sign in to request a repair
          </Button>
        </div>
      )}

      {(variant === "technician" || variant === "admin") && (
        <div className="mt-5 space-y-4">
          <Alert
            variant="info"
            title="Only customers can request a repair."
          />
          <Button type="button" disabled aria-disabled="true" className="w-full">
            Request a repair
          </Button>
        </div>
      )}

      {variant === "customer" && (
        <div className="mt-5 space-y-4">
          {status === "success" && (
            <Alert
              variant="success"
              title="Your repair request was sent"
              description={
                <>
                  You can follow its progress in{" "}
                  <Link
                    href="/dashboard/customer/bookings"
                    className="font-semibold text-foreground underline underline-offset-2"
                  >
                    View My Bookings
                  </Link>
                  .
                </>
              }
            />
          )}

          {status === "duplicate" && (
            <Alert
              variant="error"
              title="You already have an active request for this service."
            />
          )}

          <form
            className="space-y-4"
            aria-labelledby={headingId}
            noValidate
          >
            {/*
              Native submission guard. Pressing Enter fires a click on the form's
              default (first submit) button — this one is permanently disabled, so
              the form can never submit natively.
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

            <Field
              label="Name"
              htmlFor={`${uid}-name`}
              helper="From your account"
            >
              <Input
                id={`${uid}-name`}
                name="customerName"
                defaultValue={customer.name}
                readOnly
                autoComplete="name"
              />
            </Field>

            <Field
              label="Email"
              htmlFor={`${uid}-email`}
              helper="From your account"
            >
              <Input
                id={`${uid}-email`}
                name="customerEmail"
                type="email"
                defaultValue={customer.email}
                readOnly
                autoComplete="email"
              />
            </Field>

            <Field
              label="Phone"
              htmlFor={`${uid}-phone`}
              error={errors.phone}
            >
              <Input
                id={`${uid}-phone`}
                name="customerPhone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+880 1700 000 000"
                error={Boolean(errors.phone)}
                aria-invalid={errors.phone ? "true" : undefined}
                aria-describedby={
                  errors.phone ? `${uid}-phone-error` : undefined
                }
              />
            </Field>

            <Field
              label="Address"
              htmlFor={`${uid}-address`}
              error={errors.address}
            >
              <Input
                id={`${uid}-address`}
                name="address"
                autoComplete="street-address"
                placeholder="House, road, area"
                error={Boolean(errors.address)}
                aria-invalid={errors.address ? "true" : undefined}
                aria-describedby={
                  errors.address ? `${uid}-address-error` : undefined
                }
              />
            </Field>

            <Field
              label="Preferred Date"
              htmlFor={`${uid}-date`}
              error={errors.preferredDate}
            >
              <Input
                id={`${uid}-date`}
                name="preferredDate"
                type="date"
                error={Boolean(errors.preferredDate)}
                aria-invalid={errors.preferredDate ? "true" : undefined}
                aria-describedby={
                  errors.preferredDate ? `${uid}-date-error` : undefined
                }
              />
            </Field>

            <Field
              label="Problem Description"
              htmlFor={`${uid}-problem`}
              helper="Minimum 20 characters"
              error={errors.problemDescription}
            >
              <Textarea
                id={`${uid}-problem`}
                name="problemDescription"
                rows={4}
                placeholder="What's happening with the device?"
                error={Boolean(errors.problemDescription)}
                aria-invalid={errors.problemDescription ? "true" : undefined}
                aria-describedby={
                  errors.problemDescription
                    ? `${uid}-problem-error`
                    : `${uid}-problem-helper`
                }
              />
            </Field>

            {/* Wired by owner in manual phase M6 (booking creation + validation). No submit logic here. */}
            <Button type="button" className="w-full">
              <Send className="size-4" aria-hidden="true" />
              Send Repair Request
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
}
