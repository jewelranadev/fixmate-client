"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { dashboardFor, safeRedirect } from "@/lib/auth-helpers";
import { validateSignIn } from "@/lib/validators";
import SignInForm from "./SignInForm";

export default function SignInClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    const found = validateSignIn(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true);
    const { data, error } = await authClient.signIn.email({
      email: values.email.trim(),
      password: values.password,
    });
    setIsSubmitting(false);

    if (error) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Signed in successfully");
    const fallback = dashboardFor(data?.user?.role);
    router.push(safeRedirect(searchParams.get("redirect"), fallback));
    router.refresh();
  }

  return <SignInForm onSubmit={handleSubmit} errors={errors} isSubmitting={isSubmitting} />;
}