// FixMate home page — composed entirely of static server sections.
// All data comes from data/mock/*; nothing here fetches, filters or mutates
// beyond the display-only sort/limit inside FeaturedServices.

import FeaturedServicesSection from "@/components/home/FeaturedServicesSection";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { ServiceCardSkeleton } from "@/components/shared/ServiceCard";
import { Suspense } from "react";

export const metadata = {
  title: "Book expert device & appliance repair",
  description:
    "Book verified technicians for smartphone, laptop, AC, refrigerator, TV, washing machine and electrical repairs. Upfront starting prices, trackable status and payment only after the repair.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <FeaturedServicesSection />
      </Suspense>{" "}
      <HowItWorks />
      <PopularCategories />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
