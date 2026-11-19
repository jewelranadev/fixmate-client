import { getServices } from "@/lib/services-api";
import FeaturedServices from "./FeaturedServices";

export default async function FeaturedServicesSection() {
  // The server does .sort({ createdAt: -1 }).limit(6) (assignment requirement)
  const services = await getServices({ limit: 6 });
  return <FeaturedServices services={services} />;
}