import { getServices } from "@/lib/services-api";
import FeaturedServices from "./FeaturedServices";

export default async function FeaturedServicesSection() {
  let services = [];
  let failed = false;

  try {
    // The server does .sort({ createdAt: -1 }).limit(6) (assignment requirement)
    services = await getServices({ limit: 6 });
  } catch {
    failed = true;
  }

  if (failed) {
    return (
      <p className="py-16 text-center text-muted">
        Services are temporarily unavailable. Please try again shortly.
      </p>
    );
  }
  return <FeaturedServices services={services} />;
}