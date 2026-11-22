"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useAuthUser } from "@/lib/use-auth-user";
import { validateServiceForm } from "@/lib/validators";
import AddServiceSection from "./AddServiceSection";

const valueOf = (form, name) =>
  form?.elements?.namedItem(name)?.value?.trim() ?? "";

export default function AddServiceClient() {
  const router = useRouter();
  const { user } = useAuthUser();
  const [formKey, setFormKey] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Ref guard closes the gap between two clicks in the same tick: React state
  // updates are async, so `isSubmitting` alone can still be stale here.
  const submittingRef = useRef(false);

  async function handleSubmit(event) {
    if (submittingRef.current) return;
    const form = event.currentTarget.form; // read before any async work

    const values = {
      title: valueOf(form, "title"),
      category: valueOf(form, "category"),
      description: valueOf(form, "description"),
      estimatedDuration: valueOf(form, "estimatedDuration"),
      serviceMode: valueOf(form, "serviceMode"),
      serviceArea: valueOf(form, "serviceArea"),
      basePrice: valueOf(form, "basePrice"),
      image: imageUrl,
    };

    setErrors({});
    setImageError("");
    setStatus("idle");
    setMessage("");

    const validationErrors = validateServiceForm(values);
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
      await apiFetch("/api/services", {
        method: "POST",
        body: { ...values, basePrice: Number(values.basePrice) },
      });

      toast.success("Service submitted for approval");
      setStatus("success");
      form.reset();
      setImageUrl("");
      setFormKey((key) => key + 1); // remount the form to clear the preview
      // Pending services are not public yet; My Services is the list that
      // shows the new listing immediately, so send the technician there.
      router.push("/dashboard/technician/my-services");
    } catch (err) {
      const apiErrors = err.errors || {};
      const { image: imageMessage, ...fieldErrors } = apiErrors;
      if (Object.keys(fieldErrors).length) setErrors(fieldErrors);
      if (imageMessage) setImageError(imageMessage);
      const text = err.message || "Could not submit this service";
      setStatus("error");
      setMessage(text);
      toast.error(text);
    } finally {
      submittingRef.current = false;
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
