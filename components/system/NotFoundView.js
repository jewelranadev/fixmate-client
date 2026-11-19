import { Settings, Wrench } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/**
 * NotFoundView — repair-themed 404 presentation.
 * A wrench tile with an offset gear badge, a large 404 and two ways back.
 * No routing logic: the root not-found file supplies the page chrome.
 */
export default function NotFoundView({ headingLevel = "h1" }) {
  const Heading = headingLevel;

  return (
    <div className="bg-background py-16 sm:py-24">
      <Container className="text-center">
        <div className="mx-auto flex max-w-lg flex-col items-center">
          <div className="relative" aria-hidden="true">
            <div className="flex size-32 items-center justify-center rounded-full bg-primary-soft">
              <Wrench className="size-14 text-primary" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex size-12 items-center justify-center rounded-full border-4 border-background bg-secondary-soft text-secondary">
              <Settings className="size-6" />
            </span>
          </div>

          <p className="mt-8 font-heading text-6xl font-bold tracking-tight text-ink sm:text-7xl">
            404
          </p>
          <Heading className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Looks like this page is out of service
          </Heading>
          <p className="mt-3 max-w-md text-base text-muted">
            The link may be old, or the page may have moved. Let&apos;s get you
            back to something that works.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/">Back to Home</Button>
            <Button
              href="/services"
              variant="ghost"
              className="border border-border-strong"
            >
              Browse services
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
