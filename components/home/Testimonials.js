import { Star } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Container from "@/components/ui/Container";
import SectionHeading from "./SectionHeading";

// TEMPORARY MOCK CONTENT: fictional testimonials written for this UI.
// Replaced with real, consented customer reviews during integration.
const TESTIMONIALS = [
  {
    name: "Rumana Akter",
    meta: "Smartphone screen repair · Mirpur",
    quote:
      "The technician arrived when he said he would and replaced the screen while I watched. Paying after the repair made the whole thing feel low-risk.",
  },
  {
    name: "Shafin Karim",
    meta: "AC deep cleaning · Dhanmondi",
    quote:
      "Booking took a couple of minutes and the cooling was noticeably better the same evening. The price on the listing is exactly what I paid.",
  },
  {
    name: "Priya Das",
    meta: "Refrigerator cooling repair · Uttara",
    quote:
      "I could follow every status change instead of calling for updates. The fridge has been running quietly for weeks now.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What customers say after the fix"
          description="Feedback from people who booked through FixMate."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col gap-4 rounded-card border border-border bg-surface p-6 shadow-xs"
            >
              <div className="flex items-center gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
                <span className="sr-only">Rated 5 out of 5</span>
              </div>

              <blockquote className="flex-1 text-sm text-foreground">
                “{testimonial.quote}”
              </blockquote>

              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                <Avatar name={testimonial.name} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {testimonial.name}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {testimonial.meta}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
