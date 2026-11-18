import { MapPin } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";

/**
 * TechnicianCard — the technician summary shown on a service details page.
 * Initials-only avatar (no remote image), name, service area and short bio.
 * Presentational: all values come from the `technician` prop.
 */

export default function TechnicianCard({ technician, className = "" }) {
  if (!technician) return null;

  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
        Your technician
      </h2>
      <div className="mt-4 flex items-start gap-4">
        <Avatar name={technician.name} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-bold text-ink">
            {technician.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {technician.area}
          </p>
          {technician.bio && (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {technician.bio}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
