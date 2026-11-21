"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, ImageUp, Loader2 } from "lucide-react";
import Label from "@/components/ui/Label";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  uploadImage,
} from "@/lib/upload-image";

/**
 * FileInput — image picker with client-side validation, an upload progress
 * state and a preview.
 *
 * Pass `onUpload` to enable ImgBB upload through /api/upload: the chosen file
 * is validated, uploaded, and the hosted URL is handed back to the parent.
 * Without `onUpload` it stays a presentational picker (design preview).
 */
export default function FileInput({
  id,
  name = "imageFile",
  accept = ALLOWED_IMAGE_TYPES.join(","),
  label = "Service image",
  hint = "PNG, JPG or WebP, max 2 MB",
  chooseLabel = "Choose an image",
  className = "",
  previewUrl = "",
  onUpload = null,
  onError = null,
  error = "",
  disabled = false,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState("");
  const [uploadError, setUploadError] = useState("");
  const objectUrlRef = useRef(null);
  const generatedId = useId();
  const inputId = id || `file-input-${generatedId}`;
  const errorId = `${inputId}-upload-error`;

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    []
  );

  async function handleChange(event) {
    const file = event.target.files?.[0];

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setLocalPreview("");
    setUploadError("");
    onError?.("");

    if (!file) return;

    // Same rules as /api/upload — fail fast before spending an upload.
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      const message = "Only PNG, JPG or WebP images are allowed";
      setUploadError(message);
      onError?.(message);
      event.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      const message = "Image must be 2 MB or smaller";
      setUploadError(message);
      onError?.(message);
      event.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setLocalPreview(objectUrl);

    if (!onUpload) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      onUpload(url);
    } catch (err) {
      const message = err.message || "Image upload failed";
      setUploadError(message);
      onError?.(message);
    } finally {
      setIsUploading(false);
    }
  }

  const shownError = uploadError || error;
  const shownPreview = localPreview || previewUrl;
  const inputDisabled = disabled || isUploading;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={inputId}>{label}</Label>

      <label
        htmlFor={inputId}
        className={`flex min-h-11 flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-border-strong bg-surface-soft px-4 py-7 text-center transition-colors duration-150 hover:border-primary hover:bg-primary-soft/40 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary ${
          inputDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        <span className="flex size-11 items-center justify-center rounded-field bg-surface text-primary">
          <ImageUp className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-foreground">
          {isUploading ? "Uploading…" : chooseLabel}
        </span>
        <span className="text-xs text-muted">{hint}</span>
        <input
          id={inputId}
          name={name}
          type="file"
          accept={accept}
          disabled={inputDisabled}
          onChange={handleChange}
          aria-describedby={shownError ? errorId : undefined}
          className="sr-only"
        />
      </label>

      {shownPreview ? (
        <div className="flex items-center gap-3 rounded-field border border-border bg-surface px-3 py-2">
          <Image
            src={shownPreview}
            alt="Selected service image preview"
            width={56}
            height={56}
            unoptimized={shownPreview.startsWith("blob:")}
            className="size-14 shrink-0 rounded-field object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">
              {isUploading ? "Uploading…" : "Image ready"}
            </p>
            <p className="truncate text-xs text-muted">{shownPreview}</p>
          </div>
          {isUploading && (
            <Loader2 className="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-field border border-border bg-surface px-3 py-2 text-xs text-muted">
          <ImageIcon className="size-4 shrink-0" aria-hidden="true" />
          Preview appears here after you choose a file.
        </div>
      )}

      {shownError && (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {shownError}
        </p>
      )}
    </div>
  );
}
