import { Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/**
 * ForbiddenState — access-denied presentation for a signed-in user who does
 * not own the requested dashboard area.
 *
 * Wired by owner in M13: role guard.
 */
export default function ForbiddenState({
  dashboardHref = "/dashboard/customer",
  headingLevel = "h1",
}) {
  const Heading = headingLevel;

  return (
    <div className="bg-background py-16 sm:py-24">
      <Container narrow className="text-center">
        <div className="mx-auto flex max-w-lg flex-col items-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-warning-soft text-warning">
            <Lock className="size-9" aria-hidden="true" />
          </span>
          <Heading className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            You don&apos;t have access to this page
          </Heading>
          <p className="mt-3 max-w-md text-base text-muted">
            This area belongs to a different account type. If you think this is
            a mistake, sign in with the right account or contact support.
          </p>
          <Button href={dashboardHref} className="mt-8">
            Go to my dashboard
          </Button>
        </div>
      </Container>
    </div>
  );
}
