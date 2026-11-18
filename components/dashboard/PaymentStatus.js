import PaymentBadge from "@/components/shared/PaymentBadge";

/**
 * PaymentStatus — maps the assignment's lowercase payment status
 * ("paid" | "unpaid") to the capitalised values PaymentBadge accepts.
 * PaymentBadge itself is untouched.
 */
export default function PaymentStatus({ status = "unpaid", className = "" }) {
  return (
    <PaymentBadge
      status={status === "paid" ? "Paid" : "Unpaid"}
      className={className}
    />
  );
}
