"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuthUser } from "@/lib/use-auth-user";
import { apiFetch } from "@/lib/api";
import { validateBookingForm } from "@/lib/validators";
import RequestRepairPanel from "./RequestRepairPanel";

export default function RequestRepairClient({ serviceId, serviceTitle }) {
  const { user } = useAuthUser();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // guest | customer | technician | admin: chosen from the REAL session
  const variant = user ? user.role : "guest";

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      customerPhone: String(form.get("customerPhone") ?? ""),
      address: String(form.get("address") ?? ""),
      preferredDate: String(form.get("preferredDate") ?? ""),
      problemDescription: String(form.get("problemDescription") ?? ""),
    };

    const found = validateBookingForm(values);
    setErrors(found);
    setStatus("idle");
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true);
    try {
      // identity (name/email) is NOT sent: the server takes it from the verified token
      await apiFetch("/api/bookings", { method: "POST", body: { serviceId, ...values } });
      setStatus("success");
      toast.success("Repair request sent");
      event.currentTarget.reset();
    } catch (error) {
      if (error.status === 409) {
        setStatus("duplicate");
        toast.error("You already have an active request for this service");
      } else {
        if (error.errors) {
          setErrors({
            phone: error.errors.customerPhone,
            address: error.errors.address,
            preferredDate: error.errors.preferredDate,
            problemDescription: error.errors.problemDescription,
          });
        }
        toast.error(error.message || "Could not send your request");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <RequestRepairPanel
      variant={variant}
      serviceId={serviceId}
      serviceTitle={serviceTitle}
      errors={errors}
      status={status}
      defaults={{ name: user?.name ?? "", email: user?.email ?? "" }}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}