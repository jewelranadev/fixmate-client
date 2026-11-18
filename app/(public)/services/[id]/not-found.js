import { FileQuestion } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

// Friendly per-segment not-found view. The global 404 page is a later phase.
export default function ServiceNotFound() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <Container className="text-center">
        <div className="mx-auto flex max-w-lg flex-col items-center">
          <span className="flex size-16 items-center justify-center rounded-modal bg-primary-soft text-primary">
            <FileQuestion className="size-8" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Service not available
          </h1>
          <p className="mt-3 text-lg text-muted">
            {"This service doesn't exist or is no longer available."}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/services">Browse services</Button>
            <Button href="/" variant="ghost">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
