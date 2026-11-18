import Image from "next/image";
import { House, MapPin, Store, Wrench } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

/**
 * ServiceCard — one listing on the home page and on /services (next phase).
 * Props-driven, no state, no fetching. Equal-size cards: the image keeps a
 * 4:3 ratio, the content column flexes, and the button sits at the bottom.
 *
 * `showArea` is off by default (home page) and renders serviceArea when the
 * card is used in the wider /services grid.
 */

const MODE_ICONS = {
  "Home Visit": House,
  "Shop Drop-off": Store,
};

export default function ServiceCard({
  service,
  showArea = false,
  className = "",
}) {
  const {
    _id,
    title,
    category,
    image,
    basePrice,
    serviceMode,
    serviceArea,
    technicianName,
  } = service;
  const ModeIcon = MODE_ICONS[serviceMode] || House;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-xs transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
        <Image
          src={image}
          alt={`${title} — ${category} repair service`}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{category}</Badge>
          <Badge tone={serviceMode === "Home Visit" ? "secondary" : "primary"}>
            <ModeIcon className="size-3.5" aria-hidden="true" />
            {serviceMode}
          </Badge>
        </div>

        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-ink">
          {title}
        </h3>

        {showArea && (
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {serviceArea}
          </p>
        )}

        <div className="mt-auto space-y-1 pt-1">
          <p className="flex items-baseline gap-1.5">
            <span className="text-sm text-muted">From</span>
            <span className="font-heading text-xl font-bold text-ink">
              ${basePrice}
            </span>
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <Wrench className="size-3.5 shrink-0" aria-hidden="true" />
            {technicianName}
          </p>
        </div>

        <Button
          href={`/services/${_id}`}
          variant="secondary"
          className="w-full"
          aria-label={`View details for ${title}`}
        >
          View Details
        </Button>
      </div>
    </article>
  );
}

/** Skeleton with the same footprint, for the loading state on /services. */
export function ServiceCardSkeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-xs ${className}`}
    >
      <div className="aspect-[4/3] w-full animate-pulse bg-surface-soft" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex gap-2">
          <div className="h-5 w-20 animate-pulse rounded-full bg-surface-soft" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-surface-soft" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-full animate-pulse rounded bg-surface-soft" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-surface-soft" />
        </div>
        <div className="mt-auto space-y-2 pt-1">
          <div className="h-6 w-24 animate-pulse rounded bg-surface-soft" />
          <div className="h-4 w-32 animate-pulse rounded bg-surface-soft" />
        </div>
        <div className="h-11 w-full animate-pulse rounded-field bg-surface-soft" />
      </div>
    </div>
  );
}
