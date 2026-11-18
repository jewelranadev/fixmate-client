// Plain navigation config for the dashboard shell — no logic.
// Icon fields reference lucide-react components directly.
import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  PlusCircle,
  ReceiptText,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";

export const DASHBOARD_NAV = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "My Bookings", href: "/dashboard/customer/bookings", icon: CalendarDays },
    { label: "Payments", href: "/dashboard/customer/payments", icon: CreditCard },
    { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  technician: [
    { label: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
    { label: "Add Service", href: "/dashboard/technician/add-service", icon: PlusCircle },
    { label: "My Services", href: "/dashboard/technician/my-services", icon: Wrench },
    { label: "Requests", href: "/dashboard/technician/requests", icon: Inbox },
    { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Services", href: "/dashboard/admin/services", icon: LayoutGrid },
    { label: "Bookings", href: "/dashboard/admin/bookings", icon: ClipboardList },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: ReceiptText },
    { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  ],
};

// Human-readable role labels for badges.
export const ROLE_LABELS = {
  customer: "Customer",
  technician: "Technician",
  admin: "Admin",
};
