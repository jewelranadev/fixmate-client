import PageHeader from "@/components/dashboard/PageHeader";
import UsersSection from "@/components/dashboard/admin/UsersSection";
import { adminUsers, currentAdmin } from "@/data/mock/adminUsers";

export const metadata = {
  title: "Admin Users",
  description:
    "Customer, technician and admin accounts with role management controls.",
};

export default function AdminUsersPage() {
  // MOCK ONLY: replaced by the user directory from the API.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Users"
        description="Every registered account. Roles can be adjusted here; your own role is locked."
      />
      <UsersSection users={adminUsers} currentUserId={currentAdmin._id} />
    </div>
  );
}
