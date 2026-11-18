import Image from "next/image";
import { ArrowRight, ShieldCheck, Wallet } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

// Hero — the only priority image on the page (LCP). No search input by design;
// the two CTAs are the entry points. Trust chip is static copy.
export default function Hero() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge tone="secondary">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Verified technicians in your area
          </Badge>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl">
            Broken Device? Get It Fixed by Verified Technicians
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted">
            Book trusted local experts for phones, laptops, home appliances and
            electrical work. Clear upfront pricing, a status you can follow, and
            payment only after the repair is finished.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" href="/services">
              Browse Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" href="/about">
              How It Works
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-modal border border-border shadow-lg">
            <Image
              src="/images/hero-smartphone-repair.jpg"
              alt="Technician repairing a smartphone with precision tools at a workbench"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Static trust chip — floats over the image corner */}
          <div className="absolute left-4 top-full -mt-6 flex items-center gap-3 rounded-field border border-border bg-surface px-4 py-3 shadow-md sm:left-6">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
              <Wallet className="size-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">
                Pay only after the repair
              </span>
              <span className="block text-xs text-muted">
                No advance payment required
              </span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
