import { Check, Wallet } from "lucide-react";

/**
 * PaymentBadge — payment state, distinct shape language from StatusBadge
 * (A01 §3): Paid = solid green + check; Unpaid = dashed outline + wallet.
 * `status` accepts "Paid" or "Unpaid" (default "Unpaid").
 */
export default function PaymentBadge({ status = "Unpaid", className = "" }) {
  const paid = status === "Paid";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        paid
          ? "bg-success text-white"
          : "border border-dashed border-border-strong bg-surface text-muted"
      } ${className}`}
    >
      {paid ? (
        <Check className="size-3" aria-hidden="true" />
      ) : (
        <Wallet className="size-3" aria-hidden="true" />
      )}
      {paid ? "Paid" : "Unpaid"}
    </span>
  );
}
