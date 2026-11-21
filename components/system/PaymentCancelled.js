import { CircleX, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

/**
 * PaymentCancelled — friendly presentation for a checkout that the customer
 * closed before finishing. With `onRetry` the button starts a new Checkout
 * Session; without it (design preview) it stays a simple link.
 */
export default function PaymentCancelled({
  headingLevel = "h1",
  onRetry = null,
  isRetrying = false,
}) {
  const Heading = headingLevel;

  return (
    <div className="bg-background py-16 lg:py-24">
      <Container narrow>
        <Card className="px-6 py-12 text-center sm:px-10">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-warning-soft text-warning">
            <CircleX className="size-10" aria-hidden="true" />
          </span>
          <Heading className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Payment cancelled
          </Heading>
          <p className="mx-auto mt-3 max-w-md text-base text-muted">
            You closed the payment window before it finished. Your booking is
            still waiting for payment, so nothing has changed.
          </p>

          <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-card bg-success-soft px-4 py-3 text-sm font-medium text-success">
            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
            Nothing was charged to your account.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {onRetry ? (
              <Button
                type="button"
                onClick={onRetry}
                loading={isRetrying}
                disabled={isRetrying}
              >
                Try Again
              </Button>
            ) : (
              <Button href="/dashboard/customer/bookings">Try Again</Button>
            )}
            <Button
              href="/"
              variant="ghost"
              className="border border-border-strong"
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
