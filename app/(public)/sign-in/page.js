import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign in",
  description:
    "Sign in to FixMate to track repairs, manage bookings and message your technician.",
};

// UI only: the form renders idle with no errors. BetterAuth sign-in and the
// redirect (requested page or role dashboard) belong to the owner's phases.
export default function SignInPage() {
  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back. Track your repairs and manage every booking in one place."
    >
      <SignInForm />
    </AuthLayout>
  );
}
