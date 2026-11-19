import PaymentCancelled from "@/components/system/PaymentCancelled";

export const metadata = {
  title: "Payment cancelled",
  description:
    "The FixMate payment was cancelled before it finished. Nothing was charged and the booking is still waiting for payment.",
};

export default function PaymentCancelPage() {
  // MOCK ONLY: this page only presents the cancelled outcome. Retrying the
  // checkout is wired by the owner in M9.
  return <PaymentCancelled />;
}
