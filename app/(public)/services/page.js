import Container from "@/components/ui/Container";
import ServicesFilterBar from "@/components/services/ServicesFilterBar";
import ServicesGrid from "@/components/services/ServicesGrid";
import { services } from "@/data/mock/services";

export const metadata = {
  title: "Browse Services",
  description:
    "Browse approved repair services for smartphones, laptops, ACs, refrigerators, TVs, washing machines and electrical work — with starting prices, repair modes and technicians.",
};

// MOCK ONLY: the real page reads searchParams (q, category, serviceMode, sort) and the server
// queries MongoDB for search/filter/sort. Do NOT filter on the client.
// The only client-free work here is the display default: approved + available,
// newest first. The filters above do not affect this list until M5 is wired.
const availableServices = services
  .filter(
    (service) => service.approvalStatus === "approved" && service.isAvailable,
  )
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-surface py-12 lg:py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Browse
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl">Browse Repair Services</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Every listing comes from a technician whose account has been
            reviewed. Compare starting prices, repair modes and service areas,
            then send a request when you find the right fit.
          </p>
        </Container>
      </section>

      <section className="bg-background py-10 lg:py-14">
        <Container className="space-y-6">
          <ServicesFilterBar />

          <p className="text-sm text-muted" aria-live="polite">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {availableServices.length}
            </span>{" "}
            {availableServices.length === 1 ? "service" : "services"}
          </p>

          <ServicesGrid services={availableServices} />
        </Container>
      </section>
    </>
  );
}
