"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApiData } from "@/lib/use-api-data";
import { useAuthUser } from "@/lib/use-auth-user";
import RetryErrorState from "@/components/dashboard/customer/RetryErrorState";
import MyServicesSection from "./MyServicesSection";

const keyOf = (service) => String(service._id);
const valueOf = (dialog, name) =>
  dialog.querySelector(`[name="${name}"]`)?.value?.trim() ?? "";

export default function MyServicesClient() {
  const { user } = useAuthUser();
  const { data, error, isLoading, reload } = useApiData("/api/services/mine");
  const [editImages, setEditImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [availability, setAvailability] = useState({});
  const [busyIds, setBusyIds] = useState({});

  function setBusy(service, action) {
    const id = keyOf(service);
    setBusyIds((current) => {
      const next = { ...current };
      if (action) next[id] = action;
      else delete next[id];
      return next;
    });
  }

  function handleImageUpload(serviceId, url) {
    const id = String(serviceId);
    setEditImages((current) => ({ ...current, [id]: url }));
    setImageErrors((current) => ({ ...current, [id]: "" }));
  }

  function handleImageError(serviceId, message) {
    const id = String(serviceId);
    setImageErrors((current) => ({ ...current, [id]: message }));
  }

  async function handleEdit(service, dialog) {
    const id = keyOf(service);
    if (busyIds[id]) return false;

    setBusy(service, "edit");
    setFormErrors((current) => ({ ...current, [id]: {} }));

    const body = {
      title: valueOf(dialog, "title"),
      category: valueOf(dialog, "category"),
      description: valueOf(dialog, "description"),
      estimatedDuration: valueOf(dialog, "estimatedDuration"),
      serviceMode: valueOf(dialog, "serviceMode"),
      serviceArea: valueOf(dialog, "serviceArea"),
      basePrice: Number(valueOf(dialog, "basePrice")),
    };

    const image = editImages[id] || service.image;
    if (image) body.image = image; // unchanged image is kept if no new file

    try {
      await apiFetch(`/api/services/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body,
      });
      toast.success("Service updated");
      setEditImages((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      setImageErrors((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      setFormErrors((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      reload();
      return true; // close the modal
    } catch (err) {
      if (err.errors) setFormErrors((current) => ({ ...current, [id]: err.errors }));
      toast.error(err.message || "Could not update this service");
      return false; // keep the modal open
    } finally {
      setBusy(service, null);
    }
  }

  async function handleDelete(service) {
    const id = keyOf(service);
    if (busyIds[id]) return;

    setBusy(service, "delete");
    try {
      await apiFetch(`/api/services/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      toast.success("Service deleted");
      reload();
    } catch (err) {
      toast.error(err.message || "Could not delete this service");
    } finally {
      setBusy(service, null);
    }
  }

  async function handleAvailabilityChange(service, next) {
    const id = keyOf(service);
    if (busyIds[id]) return;

    setBusy(service, "availability");
    try {
      await apiFetch(`/api/services/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: { isAvailable: next }, // no re-approval for availability only
      });
      setAvailability((current) => ({ ...current, [id]: next }));
      toast.success(next ? "Service marked available" : "Service paused");
    } catch (err) {
      toast.error(err.message || "Could not update availability");
    } finally {
      setBusy(service, null);
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
      onDelete={handleDelete}
      onAvailabilityChange={handleAvailabilityChange}
      editImages={editImages}
      imageErrors={imageErrors}
      formErrors={formErrors}
      availability={availability}
      busyIds={busyIds}
      onImageUpload={handleImageUpload}
      onImageError={handleImageError}
    />
  );
}
