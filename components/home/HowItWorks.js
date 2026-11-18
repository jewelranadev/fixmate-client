import { PackageSearch, Send, Wallet, Wrench } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    title: "Find a Service",
    description:
      "Browse listings by category and compare starting prices, repair modes and the technician behind each service.",
    Icon: PackageSearch,
  },
  {
    title: "Send a Request",
    description:
      "Pick a service and share a few details about the device or appliance you need fixed.",
    Icon: Send,
  },
  {
    title: "Technician Fixes It",
    description:
      "Your technician reviews the request, confirms the visit or drop-off, and completes the repair.",
    Icon: Wrench,
  },
  {
    title: "Pay After Completion",
    description:
      "Settle the bill only once the job is done and you have checked the result.",
    Icon: Wallet,
  },
];

// 4-step flow: connected horizontally on desktop, stacked on mobile.
export default function HowItWorks() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From broken to fixed in four steps"
          description="No phone tag and no surprise charges — the process stays the same for every category."
        />

        <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
          {STEPS.map(({ title, description, Icon }, index) => (
            <li key={title} className="relative">
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[3.75rem] right-[-2rem] top-6 hidden h-0.5 bg-border-strong md:block"
                />
              )}

              <div className="relative inline-flex">
                <span className="flex size-12 items-center justify-center rounded-card bg-primary-soft text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                  {index + 1}
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
