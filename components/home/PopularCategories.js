import Link from "next/link";
import {
  AirVent,
  ArrowUpRight,
  Laptop,
  Refrigerator,
  Smartphone,
  Tv,
  WashingMachine,
  Zap,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { CATEGORIES, categoryHref } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

// Category -> icon map. All seven icons exist in the installed lucide version.
const CATEGORY_ICONS = {
  Smartphone: Smartphone,
  "Laptop & PC": Laptop,
  AC: AirVent,
  Refrigerator: Refrigerator,
  TV: Tv,
  "Washing Machine": WashingMachine,
  Electrical: Zap,
};

export default function PopularCategories() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Categories"
          title="What needs fixing today?"
          description="Seven service categories, each with approved technicians and upfront starting prices."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category];

            return (
              <Link
                key={category}
                href={categoryHref(category)}
                className="group flex items-center gap-3 rounded-card border border-border bg-surface p-4 shadow-xs transition-colors duration-200 hover:border-primary-soft hover:shadow-md sm:p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-field bg-primary-soft text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 text-sm font-semibold text-ink sm:text-base">
                  {category}
                </span>
                <ArrowUpRight
                  className="ml-auto size-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
