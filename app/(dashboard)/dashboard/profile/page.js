import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import ProfileSection from "@/components/dashboard/ProfileSection";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Update Profile",
  description:
    "Update your FixMate name, contact details, area and profile photo.",
};

export default async function ProfilePage() {
  // Verify the session on the server; never render a client-supplied identity.
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect(`/sign-in?redirect=${encodeURIComponent("/dashboard/profile")}`);
  }

  const u = session.user;
  // Better Auth keeps the editable fields on the user record. createdAt is a
  // Date from the adapter; formatDate expects an ISO/date string.
  const user = {
    id: u.id,
    name: u.name ?? "",
    email: u.email ?? "",
    role: u.role ?? "customer",
    image: u.image ?? "",
    phone: u.phone ?? "",
    area: u.area ?? "",
    bio: u.bio ?? "",
    createdAt:
      u.createdAt instanceof Date ? u.createdAt.toISOString() : (u.createdAt ?? ""),
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Profile settings"
        description="Keep your contact details current so bookings and updates reach the right person."
      />
      <ProfileSection user={user} />
    </div>
  );
}
