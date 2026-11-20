import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RedirectIfAuthed from "@/components/auth/RedirectIfAuthed";
import SignUpClient from "@/components/auth/SignUpClient";

export const metadata = {
  title: "Create your account",
  description:
    "Create a FixMate account as a customer or a technician and start booking or offering device and appliance repairs.",
};

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Book trusted repair help and follow every job from request to hand-over."
    >
      <Suspense fallback={null}>
        <SignUpClient />
      </Suspense>
      <Suspense fallback={null}>
        <RedirectIfAuthed />
      </Suspense>
    </AuthLayout>
  );
}
