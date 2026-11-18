// FixMate home page — composed entirely of static server sections.
// All data comes from data/mock/*; nothing here fetches, filters or mutates
// beyond the display-only sort/limit inside FeaturedServices.

import FeaturedServices from "@/components/home/FeaturedServices";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export const metadata = {
  title: "Book expert device & appliance repair",
  description:
    "Book verified technicians for smartphone, laptop, AC, refrigerator, TV, washing machine and electrical repairs. Upfront starting prices, trackable status and payment only after the repair.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <HowItWorks />
      <PopularCategories />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
