"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { dashboardFor } from "@/lib/auth-helpers";
import { validateSignUp } from "@/lib/validators";
import SignUpForm from "./SignUpForm";

export default function SignUpClient() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      role: String(form.get("role") ?? "customer"),
    };

    const found = validateSignUp(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true);
    const { error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      role: values.role,
    });
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Could not create your account");
      return;
    }

    toast.success("Account created successfully");
    router.push(dashboardFor(values.role));
    router.refresh();
  }

  return <SignUpForm onSubmit={handleSubmit} errors={errors} isSubmitting={isSubmitting} />;
}