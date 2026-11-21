import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import FileInput from "@/components/ui/FileInput";
import { CATEGORIES, SERVICE_MODES } from "@/lib/constants";

/**
 * ServiceFields — the service form fields shared by Add Service and the
 * Edit modal. Pure markup: no <form>, no state, no handlers. The caller
 * supplies a unique `idPrefix` so repeated instances (add form + one per
 * editable row) never collide on element ids.
 *
 * Pass `service` to pre-fill from an existing row. The image picker is wired
 * through `onImageUpload`; the hosted URL is shown as a preview and saved by
 * the caller with the service API.
 */
export default function ServiceFields({
  idPrefix,
  service = null,
  technician,
  errors = {},
  disabled = false,
  imageUrl = "",
  onImageUpload = null,
  onImageError = null,
  imageError = "",
}) {
  const describedBy = (name, helper = false) => {
    if (errors[name]) return `${idPrefix}-${name}-error`;
    return helper ? `${idPrefix}-${name}-helper` : undefined;
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field
        label="Service title"
        htmlFor={`${idPrefix}-title`}
        error={errors.title}
        required
        className="sm:col-span-2"
      >
        <Input
          id={`${idPrefix}-title`}
          name="title"
          type="text"
          defaultValue={service?.title ?? ""}
          placeholder="e.g. iPhone Screen Replacement"
          error={Boolean(errors.title)}
          disabled={disabled}
          aria-invalid={errors.title ? "true" : undefined}
          aria-describedby={describedBy("title")}
        />
      </Field>

      <Field
        label="Category"
        htmlFor={`${idPrefix}-category`}
        error={errors.category}
        required
      >
        <Select
          id={`${idPrefix}-category`}
          name="category"
          defaultValue={service?.category ?? ""}
          error={Boolean(errors.category)}
          disabled={disabled}
          aria-invalid={errors.category ? "true" : undefined}
          aria-describedby={describedBy("category")}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Base price (USD)"
        htmlFor={`${idPrefix}-basePrice`}
        error={errors.basePrice}
        helper="Starting price in USD"
        required
      >
        <Input
          id={`${idPrefix}-basePrice`}
          name="basePrice"
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          defaultValue={service?.basePrice ?? ""}
          placeholder="0.00"
          error={Boolean(errors.basePrice)}
          disabled={disabled}
          aria-invalid={errors.basePrice ? "true" : undefined}
          aria-describedby={describedBy("basePrice", true)}
        />
      </Field>

      <Field
        label="Estimated duration"
        htmlFor={`${idPrefix}-estimatedDuration`}
        error={errors.estimatedDuration}
        required
      >
        <Input
          id={`${idPrefix}-estimatedDuration`}
          name="estimatedDuration"
          type="text"
          defaultValue={service?.estimatedDuration ?? ""}
          placeholder="e.g. 2-3 hours"
          error={Boolean(errors.estimatedDuration)}
          disabled={disabled}
          aria-invalid={errors.estimatedDuration ? "true" : undefined}
          aria-describedby={describedBy("estimatedDuration")}
        />
      </Field>

      <Field
        label="Service mode"
        htmlFor={`${idPrefix}-serviceMode`}
        error={errors.serviceMode}
        required
      >
        <Select
          id={`${idPrefix}-serviceMode`}
          name="serviceMode"
          defaultValue={service?.serviceMode ?? ""}
          error={Boolean(errors.serviceMode)}
          disabled={disabled}
          aria-invalid={errors.serviceMode ? "true" : undefined}
          aria-describedby={describedBy("serviceMode")}
        >
          <option value="">Select a mode</option>
          {SERVICE_MODES.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Description"
        htmlFor={`${idPrefix}-description`}
        error={errors.description}
        required
        className="sm:col-span-2"
      >
        <Textarea
          id={`${idPrefix}-description`}
          name="description"
          rows={4}
          defaultValue={service?.description ?? ""}
          placeholder="What the repair covers, what is tested before handover, and anything the customer should prepare."
          error={Boolean(errors.description)}
          disabled={disabled}
          aria-invalid={errors.description ? "true" : undefined}
          aria-describedby={describedBy("description")}
        />
      </Field>

      <Field
        label="Service area"
        htmlFor={`${idPrefix}-serviceArea`}
        error={errors.serviceArea}
        required
      >
        <Input
          id={`${idPrefix}-serviceArea`}
          name="serviceArea"
          type="text"
          defaultValue={service?.serviceArea ?? ""}
          placeholder="e.g. Dhanmondi, Dhaka"
          error={Boolean(errors.serviceArea)}
          disabled={disabled}
          aria-invalid={errors.serviceArea ? "true" : undefined}
          aria-describedby={describedBy("serviceArea")}
        />
      </Field>

      <div className="space-y-2 sm:col-span-2">
        {service?.image && (
          <p className="text-xs text-muted">
            Current image:{" "}
            <span className="font-medium text-foreground">{service.image}</span>
          </p>
        )}
        <FileInput
          id={`${idPrefix}-image`}
          name="imageFile"
          previewUrl={imageUrl}
          onUpload={onImageUpload}
          onError={onImageError}
          error={imageError || errors.image}
          disabled={disabled}
        />
      </div>

      <Field
        label="Technician name"
        htmlFor={`${idPrefix}-technicianName`}
        helper="Taken from your technician profile."
      >
        <Input
          id={`${idPrefix}-technicianName`}
          name="technicianName"
          type="text"
          value={technician.name}
          readOnly
          aria-readonly="true"
        />
      </Field>

      <Field
        label="Technician email"
        htmlFor={`${idPrefix}-technicianEmail`}
        helper="Contact support to change your account email."
      >
        <Input
          id={`${idPrefix}-technicianEmail`}
          name="technicianEmail"
          type="email"
          value={technician.email}
          readOnly
          aria-readonly="true"
        />
      </Field>
    </div>
  );
}
