import CustomerDashboardSkeleton from "@/components/dashboard/customer/CustomerDashboardSkeleton";

// Route-level skeleton for the customer dashboard (overview, bookings and
// payments share this boundary).
export default function CustomerDashboardLoading() {
  return <CustomerDashboardSkeleton />;
}
