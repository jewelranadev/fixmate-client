import { Image as ImageIcon, ImageUp } from "lucide-react";
import Label from "@/components/ui/Label";

/**
 * FileInput — presentational image picker for service forms.
 *
 * A real <input type="file" accept="image/*"> sits inside a visible label so
 * the dashed drop-zone is the click target and the input keeps native
 * keyboard/AT behavior. No upload logic and no preview handling; the preview
 * area is a static placeholder wired by the owner in M3 (ImgBB upload).
 *
 * The visible field label is rendered above the zone and the zone is a
 * >= 44px touch target that gets the focus ring while the hidden input is
 * focused.
 */
export default function FileInput({
  id,
  name = "image",
  accept = "image/*",
  label = "Service image",
  hint = "PNG or JPG, max 2 MB",
  chooseLabel = "Choose an image",
  className = "",
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={id}>{label}</Label>

      <label
        htmlFor={id}
        className="flex min-h-11 cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-border-strong bg-surface-soft px-4 py-7 text-center transition-colors duration-150 hover:border-primary hover:bg-primary-soft/40 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary"
      >
        <span className="flex size-11 items-center justify-center rounded-field bg-surface text-primary">
          <ImageUp className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-foreground">
          {chooseLabel}
        </span>
        <span className="text-xs text-muted">{hint}</span>
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          className="sr-only"
        />
      </label>

      {/* Static placeholder: real preview appears after ImgBB upload is wired. */}
      <div className="flex items-center gap-2 rounded-field border border-border bg-surface px-3 py-2 text-xs text-muted">
        <ImageIcon className="size-4 shrink-0" aria-hidden="true" />
        Preview appears here after you choose a file.
      </div>
    </div>
  );
}
