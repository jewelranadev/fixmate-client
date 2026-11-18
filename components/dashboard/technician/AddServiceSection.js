import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ServiceFields from "./ServiceFields";

/**
 * AddServiceSection — presentation only.
 *
 * The form never submits natively: the first submit button is a permanently
 * disabled sr-only default button, and the visible action is type="button"
 * with no handler. Errors / success / loading are all prop-driven.
 *
 * Wired by owner in M3 (service creation, ImgBB upload, toast).
 */
export default function AddServiceSection({
  technician,
  errors = {},
  status = "idle",
  message = "",
  isSubmitting = false,
  className = "",
}) {
  // Unique ids keep repeated preview instances (idle / error / success /
  // submitting) from colliding on the temporary design-preview page.
  const uid = `add-service-${status}-${
    Object.keys(errors).length ? "errors" : "clean"
  }-${isSubmitting ? "loading" : "idle"}`;

  const shownMessage =
    status === "success"
      ? message || "Service submitted. It is waiting for admin approval."
      : status === "error"
        ? message || "We couldn't submit this service. Please review the fields and try again."
        : null;

  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      <form noValidate className="space-y-6">
        {/*
          Native submission guard. Pressing Enter fires a click on the form's
          default (first submit) button — this one is permanently disabled, so
          the form can never submit natively.
        */}
        <button
          type="submit"
          disabled
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        >
          Submit
        </button>

        {shownMessage && (
          <Alert
            variant={status === "error" ? "error" : "success"}
            title={shownMessage}
          />
        )}

        <ServiceFields
          idPrefix={uid}
          technician={technician}
          errors={errors}
          disabled={isSubmitting}
        />

        <p className="text-sm text-muted">
          New services wait for admin approval before appearing publicly.
        </p>

        <div className="flex justify-end">
          {/* Wired by owner in M3 (service creation, ImgBB upload, toast). */}
          <Button
            type="button"
            loading={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Submitting…" : "Submit for approval"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
