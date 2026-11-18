import { PackageSearch } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import EmptyState from "@/components/ui/EmptyState";

/**
 * ServicesGrid — 1 / 2 / 3 / 4 columns by breakpoint.
 * Cards share the grid row height and the ServiceCard's 4:3 image keeps
 * every card the same size. Renders EmptyState when the list is empty.
 */

export default function ServicesGrid({ services = [] }) {
  if (!services.length) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No services match your search"
        description="Try a different keyword, or clear the filters to see every service available right now."
        action={{ label: "Clear filters", href: "/services" }}
      />
    );
  }

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} showArea />
      ))}
    </div>
  );
}
