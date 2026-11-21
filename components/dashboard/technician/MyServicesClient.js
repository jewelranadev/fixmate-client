"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApiData } from "@/lib/use-api-data";
import { useAuthUser } from "@/lib/use-auth-user";
import RetryErrorState from "@/components/dashboard/customer/RetryErrorState";
import MyServicesSection from "./MyServicesSection";

const valueOf = (dialog, name) =>
  dialog.querySelector(`[name="${name}"]`)?.value?.trim() ?? "";

export default function MyServicesClient() {
  const { user } = useAuthUser();
  const { data, error, isLoading, reload } = useApiData("/api/services/mine");
  const [editImages, setEditImages] = useState({});
  const [editErrors, setEditErrors] = useState({});

  function handleImageUpload(serviceId, url) {
    setEditImages((current) => ({ ...current, [serviceId]: url }));
    setEditErrors((current) => ({ ...current, [serviceId]: "" }));
  }

  function handleImageError(serviceId, message) {
    setEditErrors((current) => ({ ...current, [serviceId]: message }));
  }

  async function handleEdit(service, dialog) {
    const body = {
      title: valueOf(dialog, "title"),
      category: valueOf(dialog, "category"),
      description: valueOf(dialog, "description"),
      estimatedDuration: valueOf(dialog, "estimatedDuration"),
      serviceMode: valueOf(dialog, "serviceMode"),
      serviceArea: valueOf(dialog, "serviceArea"),
      basePrice: Number(valueOf(dialog, "basePrice")),
    };

    const image = editImages[service._id] || service.image;
    if (image) body.image = image; // unchanged image is kept if no new file

    try {
      await apiFetch(`/api/services/${encodeURIComponent(service._id)}`, {
        method: "PATCH",
        body,
      });
      toast.success("Service updated");
      setEditImages((current) => {
        const next = { ...current };
        delete next[service._id];
        return next;
      });
      setEditErrors((current) => {
        const next = { ...current };
        delete next[service._id];
        return next;
      });
      reload();
      return true; // close the modal
    } catch (err) {
      toast.error(err.message || "Could not update this service");
      return false; // keep the modal open
    }
  }

  if (error) {
    return (
      <RetryErrorState
        title="We couldn't load your services"
        description="Your listings are unavailable right now. Try again in a moment."
        onRetry={reload}
      />
    );
  }

  return (
    <MyServicesSection
      services={data?.services ?? []}
      technician={{ name: user?.name || "", email: user?.email || "" }}
      loading={isLoading}
      onEdit={handleEdit}
      editImages={editImages}
      editErrors={editErrors}
      onImageUpload={handleImageUpload}
      onImageError={handleImageError}
    />
  );
}
