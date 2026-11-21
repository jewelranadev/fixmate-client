"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useAuthUser } from "@/lib/use-auth-user";
import AddServiceSection from "./AddServiceSection";

const valueOf = (form, name) =>
  form?.elements?.namedItem(name)?.value?.trim() ?? "";

export default function AddServiceClient() {
  const { user } = useAuthUser();
  const [formKey, setFormKey] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    if (isSubmitting) return;
    const form = event.currentTarget.form; // read before any async work

    setErrors({});
    setImageError("");
    setStatus("idle");
    setMessage("");

    if (!imageUrl) {
      const text = "Upload a service image before submitting.";
      setImageError(text);
      toast.error(text);
      return;
    }

    setIsSubmitting(true);
    try {
      await apiFetch("/api/services", {
        method: "POST",
        body: {
          title: valueOf(form, "title"),
          category: valueOf(form, "category"),
          description: valueOf(form, "description"),
          estimatedDuration: valueOf(form, "estimatedDuration"),
          serviceMode: valueOf(form, "serviceMode"),
          serviceArea: valueOf(form, "serviceArea"),
          basePrice: Number(valueOf(form, "basePrice")),
          image: imageUrl, // hosted URL returned by /api/upload
        },
      });

      toast.success("Service submitted for approval");
      setStatus("success");
      form.reset();
      setImageUrl("");
      setFormKey((key) => key + 1); // remount the form to clear the preview
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      const text = err.message || "Could not submit this service";
      setStatus("error");
      setMessage(text);
      toast.error(text);
    } finally {
      setIsSubmitting(false);
    }
  }

  const technician = { name: user?.name || "", email: user?.email || "" };

  return (
    <AddServiceSection
      key={formKey}
      technician={technician}
      errors={errors}
      status={status}
      message={message}
      isSubmitting={isSubmitting}
      imageUrl={imageUrl}
      imageError={imageError}
      onImageUpload={(url) => {
        setImageUrl(url);
        setImageError("");
      }}
      onImageError={setImageError}
      onSubmit={handleSubmit}
    />
  );
}
