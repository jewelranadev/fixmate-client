import Container from "@/components/ui/Container";
import ErrorState from "@/components/ui/ErrorState";
import ServicesFilterBar from "@/components/services/ServicesFilterBar";
import ServicesGrid from "@/components/services/ServicesGrid";
import { getServices } from "@/lib/services-api";

const first = (value) => (Array.isArray(value) ? value[0] : value) ?? "";

export const metadata = {
  title: "Browse Services",
  description:
    "Browse approved repair services for smartphones, laptops, ACs, refrigerators, TVs, washing machines and electrical work — with starting prices, repair modes and technicians.",
};

// Searching, filtering and sorting are done by the API — never on the client.
export default async function ServicesPage({ searchParams }) {
  const params = (await searchParams) ?? {};
  const values = {
    q: first(params.q),
    category: first(params.category),
    serviceMode: first(params.serviceMode),
    sort: first(params.sort) || "newest",
  };

  let services = [];
  let failed = false;
  try {
    services = await getServices(values);
  } catch {
    failed = true;
  }

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
          <ServicesFilterBar defaultValues={values} />

          {failed ? (
            <ErrorState
              title="We couldn't load services"
              description="The service list is temporarily unavailable. Please try again in a moment."
            />
          ) : (
            <>
              <p className="text-sm text-muted" aria-live="polite">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {services.length}
                </span>{" "}
                {services.length === 1 ? "service" : "services"}
              </p>

              <ServicesGrid services={services} />
            </>
          )}
        </Container>
      </section>
    </>
  );
}
