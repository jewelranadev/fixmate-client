"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * ConfirmDialog — native <dialog> + showModal() confirmation panel.
 *
 * This is the ONLY new client component in this phase; it owns no business
 * logic. It opens from `trigger` (a button node or a render prop), and closes
 * on Cancel, Escape and backdrop click. Focus returns to whatever was focused
 * when it opened.
 *
 * When `onConfirm` is provided it runs first; the dialog closes afterwards.
 * While it is pending, the confirm button shows a loading state and Cancel,
 * Escape and backdrop clicks are ignored. Without `onConfirm` the confirm
 * button only closes the dialog (the original preview behaviour).
 */
export default function ConfirmDialog({
  title,
  description = null,
  confirmLabel = "Confirm",
  tone = "default",
  trigger,
  onConfirm,
}) {
  const [open, setOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  // Opening/closing is driven by state so the handlers never touch refs
  // during render. showModal() moves focus into the dialog automatically.
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

  // Runs the caller's work (if any), then closes. The caller surfaces its own
  // failures (e.g. a toast), so the dialog still closes afterwards.
  const handleConfirm = async () => {
    if (isConfirming) return;

    if (!onConfirm) {
      closeDialog();
      return;
    }

    setIsConfirming(true);
    try {
      await onConfirm();
    } catch {
      // Intentionally empty: the caller owns error reporting.
    } finally {
      setIsConfirming(false);
      setOpen(false);
    }
  };

  const handleClose = () => {
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    setOpen(false);
    if (target && typeof target.focus === "function") target.focus();
  };

  // Clicks on the ::backdrop are reported on the dialog element itself.
  const handleBackdropClick = (event) => {
    if (isConfirming) return;
    if (event.target === dialogRef.current) closeDialog();
  };

  // Escape fires the native `cancel` event; ignore it while confirming.
  const handleCancel = (event) => {
    if (isConfirming) event.preventDefault();
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
        className="m-auto w-[calc(100vw-2rem)] max-w-md rounded-modal border border-border bg-surface p-0 text-foreground shadow-lg backdrop:bg-ink/60"
      >
        <div className="p-6">
          <span
            className={`flex size-12 items-center justify-center rounded-modal ${
              tone === "danger"
                ? "bg-danger-soft text-danger"
                : "bg-warning-soft text-warning"
            }`}
          >
            <TriangleAlert className="size-6" aria-hidden="true" />
          </span>

          <h2 id={titleId} className="mt-4 text-lg font-bold text-ink">
            {title}
          </h2>

          {description && (
            <p
              id={descriptionId}
              className="mt-2 text-sm leading-relaxed text-muted"
            >
              {description}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={closeDialog}
              disabled={isConfirming}
              className="w-full sm:w-auto"
            >
              Cancel
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
