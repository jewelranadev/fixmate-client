import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService } from "@/lib/services-api";

import {
  ChevronRight,
  CircleDollarSign,
  Clock,
  House,
  MapPin,
  Store,
  Tag,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import RequestRepairPanel from "@/components/services/RequestRepairPanel";
import TechnicianCard from "@/components/services/TechnicianCard";

// Check whether service is approved and available
function isServiceAvailable(service) {
  return (
    Boolean(service) &&
    service.approvalStatus === "approved" &&
    service.isAvailable === true
  );
}

// Generate dynamic page metadata from API
export async function generateMetadata({ params }) {
  const { id } = await params;

  const data = await getService(id);
  const service = data?.service;

  if (!isServiceAvailable(service)) {
    return {
      title: "Service not available",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

// Service Details Page
export default async function ServiceDetailsPage({ params }) {
  // Get dynamic route ID
  const { id } = await params;

  // Fetch service data from backend API
  const data = await getService(id);

  // If service does not exist, show 404 page
  if (!data) notFound();

  // Extract service from API response
  const { service } = data;

  // Check service availability
  if (!isServiceAvailable(service)) {
    notFound();
  }

  // Get technician information from API response
  const technician = data.technician ?? {
    name: service.technicianName,
    area: service.serviceArea,
    bio: "",
    image: "",
  };

  // Select icon based on service mode
  const ModeIcon = service.serviceMode === "Home Visit" ? House : Store;

  // Service details
  const details = [
    {
      label: "Starting price",
      value: `From $${service.basePrice}`,
      Icon: CircleDollarSign,
    },
    {
      label: "Estimated duration",
      value: service.estimatedDuration,
      Icon: Clock,
    },
    {
      label: "Service mode",
      value: service.serviceMode,
      Icon: ModeIcon,
    },
    {
      label: "Service area",
      value: service.serviceArea,
      Icon: MapPin,
    },
    {
      label: "Category",
      value: service.category,
      Icon: Tag,
    },
  ];

  return (
    <div className="bg-background py-8 lg:py-12">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link
                href="/services"
                className="font-medium text-foreground transition-colors hover:text-primary"
              >
                Services
              </Link>
            </li>

            <li aria-hidden="true" className="text-muted">
              <ChevronRight className="size-4" />
            </li>

            <li aria-current="page" className="line-clamp-1 text-muted">
              {service.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Service Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-surface-soft shadow-xs sm:aspect-[16/9]">
              <Image
                src={service.image}
                alt={`${service.title} — ${service.category} repair service`}
                fill
                preload
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            {/* Service Information */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="neutral">
                  {service.category}
                </Badge>

                <Badge
                  tone={
                    service.serviceMode === "Home Visit"
                      ? "secondary"
                      : "primary"
                  }
                >
                  <ModeIcon className="size-3.5" aria-hidden="true" />
                  {service.serviceMode}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {service.title}
              </h1>

              <p className="max-w-3xl text-lg leading-relaxed text-muted">
                {service.description}
              </p>
            </div>

            {/* Service Details */}
            <section
              aria-labelledby="service-details-heading"
              className="rounded-card border border-border bg-surface p-5 shadow-xs sm:p-6"
            >
              <h2
                id="service-details-heading"
                className="text-lg font-bold text-ink"
              >
                Service details
              </h2>

              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {details.map(({ label, value, Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-field bg-surface-soft text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        {label}
                      </dt>

                      <dd className="mt-0.5 text-sm font-semibold text-foreground">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>

            {/* Technician Information */}
            <TechnicianCard technician={technician} />
          </div>

          {/* Right Sidebar */}
          <aside
            aria-label="Request this service"
            className="space-y-4 lg:sticky lg:top-24 lg:self-start"
          >
            {/* Pricing Card */}
            <Card className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                Starting price
              </p>

              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="font-heading text-4xl font-bold tracking-tight text-ink">
                  ${service.basePrice}
                </span>

                <span className="text-sm text-muted">
                  base
                </span>
              </p>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                Final price is confirmed by the technician after inspection.
              </p>
            </Card>

            {/* Repair Request Panel */}
            <RequestRepairPanel
              variant="guest"
              serviceId={service._id}
              serviceTitle={service.title}
            />
          </aside>
        </div>
      </Container>
    </div>
  );
}
