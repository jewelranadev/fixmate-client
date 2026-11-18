import {
  ListChecks,
  ReceiptText,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "./SectionHeading";

const POINTS = [
  {
    title: "Verified technicians",
    description:
      "Every technician is reviewed before their services go live, so the person at your door has been checked first.",
    Icon: ShieldCheck,
  },
  {
    title: "Pay after the repair",
    description:
      "No advance payment. You settle the bill once the job is finished and you have checked the result.",
    Icon: Wallet,
  },
  {
    title: "Trackable job status",
    description:
      "Follow each request from sent to completed with a clear status at every step — no chasing for updates.",
    Icon: ListChecks,
  },
  {
    title: "Transparent pricing",
    description:
      "Starting prices are shown on every listing, so you know the range before you send a request.",
    Icon: ReceiptText,
  },
];

// STATIC DEMO NUMBERS: replace with real platform stats during integration.
const STATS = [
  { value: "1,200+", label: "Repairs completed" },
  { value: "4.8/5", label: "Average customer rating" },
  { value: "45+", label: "Verified technicians" },
  { value: "7", label: "Service categories" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why FixMate"
          title="Repair service without the guesswork"
          description="A short, honest process built around the two things that matter: a trusted technician and a price you agreed to."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {POINTS.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="flex gap-4 rounded-card border border-border bg-background p-6"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-field bg-secondary-soft text-secondary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-bold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 rounded-modal bg-navy px-6 py-8 sm:grid-cols-4 lg:px-10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-2xl font-bold text-white lg:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
