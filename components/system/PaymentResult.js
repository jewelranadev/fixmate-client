import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { formatCurrency } from "@/lib/format/display";

/**
 * PaymentResult — shared presentation for the three payment outcomes.
 * Purely visual: no Stripe call, no session_id handling and no verification.
 * The real page reads the checkout result and calls the protected verify
 * endpoint (owner, M9).
 *
 * `headingLevel` defaults to h1 (the page's only heading) and is lowered for
 * the temporary design-preview page.
 */

function SummaryRow({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="shrink-0 text-sm text-muted">{label}</dt>
      <dd className="min-w-0 text-right text-sm font-medium text-foreground">
        {children}
      </dd>
    </div>
  );
}

export default function PaymentResult({
  status = "success",
  amount = null,
  transactionId = "",
  serviceTitle = "",
  message = "",
  headingLevel = "h1",
}) {
  const Heading = headingLevel;
  const amountLabel =
    amount === null || amount === "" ? "—" : formatCurrency(amount);

  if (status === "verifying") {
    return (
      <div className="bg-background py-16 lg:py-24">
        <Container narrow>
          <div role="status" aria-live="polite">
            <Card className="px-6 py-12 text-center sm:px-10">
              <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-info-soft text-info">
                <Loader2 className="size-10 animate-spin" aria-hidden="true" />
              </span>
              <Heading className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Confirming your payment…
              </Heading>
              <p className="mx-auto mt-3 max-w-md text-base text-muted">
                This only takes a moment. Keep this page open while we check
                the payment with the provider.
              </p>
              <div
                aria-hidden="true"
                className="mx-auto mt-8 max-w-sm space-y-3"
              >
                <div className="h-4 w-2/3 animate-pulse rounded bg-surface-soft" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-surface-soft" />
                <div className="h-4 w-3/5 animate-pulse rounded bg-surface-soft" />
              </div>
              <span className="sr-only">
                Checking the payment status. Do not close this page.
              </span>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-background py-16 lg:py-24">
        <Container narrow>
          <Card className="px-6 py-12 text-center sm:px-10">
            <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-danger-soft text-danger">
              <CircleAlert className="size-10" aria-hidden="true" />
            </span>
            <Heading className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              We couldn&apos;t confirm your payment
            </Heading>
            <p className="mx-auto mt-3 max-w-md text-base text-muted">
              {message ||
                "The payment was not confirmed. Check your bookings before trying again — no duplicate charge has been made."}
            </p>
            <Button
              href="/dashboard/customer/bookings"
              className="mt-8 w-full sm:w-auto"
            >
              Back to My Bookings
            </Button>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-background py-16 lg:py-24">
      <Container narrow>
        <Card className="px-6 py-12 text-center sm:px-10">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-success-soft text-success">
            <CircleCheck className="size-10" aria-hidden="true" />
          </span>
          <Heading className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Payment successful
          </Heading>
          <p className="mx-auto mt-3 max-w-md text-base text-muted">
            Your payment went through and the repair is confirmed. You can find
            the booking and its receipt in your dashboard.
          </p>

          <dl className="mx-auto mt-8 max-w-md divide-y divide-border rounded-card border border-border bg-surface-soft px-4 text-left">
            <SummaryRow label="Service">{serviceTitle}</SummaryRow>
            <SummaryRow label="Amount paid">
              <span className="font-heading text-lg font-bold text-ink">
                {amountLabel}
              </span>
            </SummaryRow>
            <SummaryRow label="Transaction ID">
              <span className="break-all font-mono text-xs text-foreground">
                {transactionId}
              </span>
            </SummaryRow>
          </dl>

          <Button
            href="/dashboard/customer/bookings"
            className="mt-8 w-full sm:w-auto"
          >
            Back to My Bookings
          </Button>
        </Card>
      </Container>
    </div>
  );
}
