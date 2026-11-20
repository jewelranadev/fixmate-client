import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RedirectIfAuthed from "@/components/auth/RedirectIfAuthed";
import SignInClient from "@/components/auth/SignInClient";

export const metadata = {
  title: "Sign in",
  description:
    "Sign in to FixMate to track repairs, manage bookings and message your technician.",
};

export default function SignInPage() {
  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back. Track your repairs and manage every booking in one place."
    >
      <Suspense fallback={null}>
        <SignInClient />
      </Suspense>
      <Suspense fallback={null}>
        <RedirectIfAuthed />
      </Suspense>
    </AuthLayout>
  );
}
