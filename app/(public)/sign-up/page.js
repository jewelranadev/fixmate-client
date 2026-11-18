import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Create your account",
  description:
    "Create a FixMate account as a customer or a technician and start booking or offering device and appliance repairs.",
};

// UI only: the form renders idle with no errors. BetterAuth wiring, validation
// and the post-sign-up redirect belong to the owner's manual phases (M1/M13).
export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Book trusted repair help and follow every job from request to hand-over."
    >
      <SignUpForm />
    </AuthLayout>
  );
}
