"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * Modal: native <dialog> with a scrollable body.
 * onConfirm(dialogElement) may be async. Returning false (or throwing) keeps the
 * modal open; anything else closes it. Without onConfirm the button only closes.
 */
const SIZES = {
  md: "max-w-md",
  lg: "max-w-2xl",
};

export default function Modal({
  trigger,
  title,
  description = null,
  children = null,
  cancelLabel = "Cancel",
  confirmLabel = "Save changes",
  tone = "default",
  size = "md",
  onConfirm,
}) {
  const [open, setOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      returnFocusRef.current = document.activeElement;
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  const openDialog = () => setOpen(true);

  const closeDialog = () => {
    if (isConfirming) return;
    setOpen(false);
  };

  const handleClose = () => {
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    setOpen(false);
    if (target && typeof target.focus === "function") target.focus();
  };

  const handleConfirm = async () => {
    if (isConfirming) return;
    if (!onConfirm) {
      setOpen(false);
      return;
    }

    setIsConfirming(true);
    let keepOpen = false;
    try {
      const result = await onConfirm(dialogRef.current);
      keepOpen = result === false;
    } catch {
      keepOpen = true;
    } finally {
      setIsConfirming(false);
    }
    if (!keepOpen) setOpen(false);
  };

  // Escape fires the native "cancel" event: ignore it while saving.
  const handleCancel = (event) => {
    if (isConfirming) event.preventDefault();
  };

  // Clicks on the ::backdrop are reported on the dialog element itself.
  const handleBackdropClick = (event) => {
    if (isConfirming) return;
    if (event.target === dialogRef.current) closeDialog();
  };

  let triggerNode = null;

  if (typeof trigger === "function") {
    triggerNode = trigger({
      onClick: openDialog,
      "aria-haspopup": "dialog",
    });
  } else if (isValidElement(trigger)) {
    triggerNode = cloneElement(trigger, {
      onClick: (event) => {
        trigger.props.onClick?.(event);
        openDialog();
      },
      "aria-haspopup": "dialog",
    });
  }

  return (
    <>
      {triggerNode}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClose={handleClose}
        onCancel={handleCancel}
        onClick={handleBackdropClick}
        className={`m-auto w-[calc(100vw-2rem)] overflow-hidden rounded-modal border border-border bg-surface p-0 text-foreground shadow-lg backdrop:bg-ink/60 ${
          SIZES[size] || SIZES.md
        }`}
      >
        <div className="flex max-h-[calc(100vh-2rem)] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
            <div className="min-w-0">
              <h2 id={titleId} className="text-lg font-bold text-ink">
                {title}
              </h2>
              {description && (
                <p
                  id={descriptionId}
                  className="mt-1 text-sm leading-relaxed text-muted"
                >
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={closeDialog}
              disabled={isConfirming}
              aria-label="Close dialog"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-field text-muted transition-colors hover:bg-surface-soft hover:text-foreground"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            {children}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={closeDialog}
              disabled={isConfirming}
              className="w-full sm:w-auto"
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              variant={tone === "danger" ? "destructive" : "primary"}
              onClick={handleConfirm}
              loading={isConfirming}
              disabled={isConfirming}
              className="w-full sm:w-auto"
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}