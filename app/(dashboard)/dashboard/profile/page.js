import PageHeader from "@/components/dashboard/PageHeader";
import ProfileSection from "@/components/dashboard/ProfileSection";
import { profileUser } from "@/data/mock/profile";

export const metadata = {
  title: "Update Profile",
  description:
    "Update your FixMate name, contact details, area and profile photo.",
};

export default function ProfilePage() {
  // MOCK ONLY: the customer comes from data/mock/profile.js. The real session
  // user is wired by the owner in M13.
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Profile settings"
        description="Keep your contact details current so bookings and updates reach the right person."
      />
      <ProfileSection user={profileUser} />
    </div>
  );
}
