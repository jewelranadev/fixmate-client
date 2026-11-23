"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { validateProfileForm } from "@/lib/validators";
import ProfileSection from "./ProfileSection";

const valueOf = (form, name) =>
  form?.elements?.namedItem(name)?.value?.trim() ?? "";

function normalizeUser(user) {
  return {
    ...user,
    createdAt:
      user?.createdAt instanceof Date
        ? user.createdAt.toISOString()
        : (user?.createdAt ?? ""),
  };
}

export default function ProfileClient({ initialUser }) {
  const router = useRouter();
  const session = authClient.useSession();
  const [user, setUser] = useState(() => normalizeUser(initialUser));
  const [formKey, setFormKey] = useState(0);
  const [imageUrl, setImageUrl] = useState(initialUser?.image ?? "");
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Ref guard closes the gap between two clicks in the same tick.
  const submittingRef = useRef(false);

  async function handleSubmit(event) {
    if (submittingRef.current) return;
    const form = event.currentTarget.form;

    const values = {
      name: valueOf(form, "name"),
      phone: valueOf(form, "phone"),
      area: valueOf(form, "area"),
      bio: valueOf(form, "bio"),
      image: imageUrl,
    };

    setErrors({});
    setImageError("");
    setStatus("idle");
    setMessage("");

    const validationErrors = validateProfileForm(values);
    if (Object.keys(validationErrors).length) {
      const { image: imageMessage, ...fieldErrors } = validationErrors;
      setErrors(fieldErrors);
      if (imageMessage) setImageError(imageMessage);
      setStatus("error");
      const text = "Check the highlighted fields and try again.";
      setMessage(text);
      toast.error(text);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const res = await apiFetch("/api/users/profile", {
        method: "PATCH",
        body: values,
      });

      const updatedUser = normalizeUser(res.user ?? { ...user, ...values });
      setUser(updatedUser);
      setImageUrl(updatedUser.image ?? "");
      setStatus("success");
      setMessage("Profile updated successfully");
      setFormKey((key) => key + 1); // remount so defaultValues reflect saved data
      toast.success("Profile updated successfully");

      // Refresh server-rendered profile data and Better Auth session so
      // navbar/topbar reflect the updated name/image without logout.
      router.refresh();
      await session.refetch?.();
    } catch (err) {
      const apiErrors = err.errors || {};
      const { image: imageMessage, ...fieldErrors } = apiErrors;
      if (Object.keys(fieldErrors).length) setErrors(fieldErrors);
      if (imageMessage) setImageError(imageMessage);
      const text = err.message || "Could not update your profile";
      setStatus("error");
      setMessage(text);
      toast.error(text);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <ProfileSection
      key={formKey}
      user={user}
      errors={errors}
      status={status}
      message={message}
      isSubmitting={isSubmitting}
      imageUrl={imageUrl}
      imageError={imageError}
      onImageUpload={(url) => {
        setImageUrl(url);
        setImageError("");
        setStatus("idle");
        setMessage("");
      }}
      onImageError={setImageError}
      onSubmit={handleSubmit}
    />
  );
}
