import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/shared/ServiceCard";
import { services } from "@/data/mock/services";
import SectionHeading from "./SectionHeading";

export default function FeaturedServices() {
  // MOCK ONLY: the real page fetches approved+available services with
  // .sort({ createdAt: -1 }).limit(6)
  // ISO-8601 strings compare correctly as plain strings, so no Date parsing.
  const featured = services
    .filter((service) => service.approvalStatus === "approved" && service.isAvailable)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);

  return (
    <section className="bg-background py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Featured"
          title="Latest services from verified technicians"
          description="Fresh listings from technicians across Dhaka — every service is reviewed and approved before it appears here."
          action={
            <Button variant="ghost" href="/services">
              View all services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          }
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
