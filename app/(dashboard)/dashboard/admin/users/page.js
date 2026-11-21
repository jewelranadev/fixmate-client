import { Suspense } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import UsersClient from "@/components/dashboard/admin/UsersClient";

export const metadata = {
  title: "Manage Users",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="View every account and change user roles."
      />

      <Suspense fallback={null}>
        <UsersClient />
      </Suspense>
    </div>
  );
}