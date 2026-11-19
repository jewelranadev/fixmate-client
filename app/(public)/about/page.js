import Image from "next/image";
import { ArrowRight, Check, ChevronDown, Users, Wrench } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import HowItWorks from "@/components/home/HowItWorks";
import SectionHeading from "@/components/home/SectionHeading";
import WhyChooseUs from "@/components/home/WhyChooseUs";

/**
 * About FixMate — static marketing page.
 * Reuses the approved home sections by importing them; no fetching, no
 * dynamic APIs and no client state. The FAQ is native <details>/<summary>.
 */

export const metadata = {
  title: "About FixMate",
  description:
    "How FixMate connects customers with verified repair technicians: approved services, a trackable job status and payment only after the repair is complete.",
};

const CUSTOMER_BENEFITS = [
  "Browse approved services with starting prices shown up front",
  "Send a repair request with the details that matter",
  "Track every step from request to completion",
  "Pay only after the repair is finished and checked",
];

const TECHNICIAN_BENEFITS = [
  "List your services with photos, pricing and service area",
  "Manage every incoming request from one dashboard",
  "Update the job status so customers always know where things stand",
  "Set the final amount once the work is complete",
];

const FAQS = [
  {
    question: "How do I book a repair?",
    answer:
      "Pick the service you need, share a few details about the problem and choose a preferred date. A technician then reviews the request and confirms the visit or drop-off.",
  },
  {
    question: "Are the technicians verified?",
    answer:
      "Yes. Every technician is reviewed before their services go live on FixMate. Listings that do not meet the platform standards stay off the marketplace.",
  },
  {
    question: "When do I pay?",
    answer:
      "After the repair is complete. You check the result first, then pay the final amount agreed with the technician. No advance payment is required.",
  },
  {
    question: "Can I follow the progress of my repair?",
    answer:
      "Every request has a clear status — requested, accepted, in progress, completed, rejected or cancelled — so you can see where things stand without calling for an update.",
  },
  {
    question: "What happens if a repair cannot be completed?",
    answer:
      "The technician updates the request and explains what happened. If the job does not go ahead, no payment is taken.",
  },
];

function StepIcon({ Icon, tone }) {
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-field ${
        tone === "secondary"
          ? "bg-secondary-soft text-secondary"
          : "bg-primary-soft text-primary"
      }`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ------------------------------------------------------------ header */}
      <section className="bg-surface py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              About FixMate
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              How FixMate works
            </h1>
            <p className="text-lg leading-relaxed text-muted">
              FixMate is a local repair marketplace built around one simple
              idea: before you pay, you should know who is coming, what the job
              will cost and where things stand.
            </p>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- problem/promise */}
      <section className="bg-background py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  The problem
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  A broken device should not turn into a guessing game
                </h2>
                <p className="text-base leading-relaxed text-muted">
                  Most people do not have a trusted technician on speed dial. A
                  quick search brings up vague listings, prices that change at
                  the door and no easy way to tell whether the person arriving
                  has been checked at all.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Then comes the awkward part: paying before you know whether
                  the repair will hold.
                </p>
              </div>

              <div className="space-y-3 rounded-card border border-border bg-surface p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                  The promise
                </p>
                <h3 className="text-xl font-bold text-ink">
                  One clear status trail, payment at the end
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Every job on FixMate has a clear, trackable status and is paid
                  only after completion. You see the starting price, the
                  technician behind the service and each step from request to
                  done — then you settle the bill once you have checked the
                  result.
                </p>
                <ul className="space-y-2 pt-1">
                  {[
                    "Approved listings instead of anonymous classifieds",
                    "A visible status at every step of the repair",
                    "Payment after completion, never before",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm text-foreground"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-modal border border-border shadow-xs">
              <Image
                src="/images/tool-wall.jpg"
                alt="A workshop wall hung with wrenches, screwdrivers and other repair tools"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- 4-step flow */}
      <HowItWorks />

      {/* ------------------------------------------------------------ benefits */}
      <section className="bg-background py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Who it is for"
            title="One process, two sides"
            description="FixMate keeps customers and technicians on the same page from the first request to the final payment."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <StepIcon Icon={Users} tone="primary" />
                <h3 className="text-xl font-bold text-ink">For customers</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Find a service that fits the problem, then let the status trail
                do the chasing.
              </p>
              <ul className="mt-6 space-y-3">
                {CUSTOMER_BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-sm text-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <StepIcon Icon={Wrench} tone="secondary" />
                <h3 className="text-xl font-bold text-ink">For technicians</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Publish what you do best and keep every job moving from one
                dashboard.
              </p>
              <ul className="mt-6 space-y-3">
                {TECHNICIAN_BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-sm text-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- trust points */}
      <WhyChooseUs />

      {/* ---------------------------------------------------------------- FAQ */}
      <section className="bg-background py-16 lg:py-24">
        <Container narrow>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions people ask before booking"
            description="Short answers to the things that come up most often."
          />

          <div className="mt-8 divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-bright [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- CTA */}
      <section className="bg-navy py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ready to get something fixed?
              </h2>
              <p className="mt-2 text-base text-white/75">
                Browse approved services, or create an account to track every
                repair from request to completion.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/services" size="lg">
                Browse services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                href="/sign-up"
                variant="ghost"
                size="lg"
                className="bg-white text-navy hover:bg-white/90"
              >
                Create an account
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
