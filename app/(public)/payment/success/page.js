import PaymentResult from "@/components/system/PaymentResult";

export const metadata = {
  title: "Payment successful",
  description:
    "Your FixMate repair payment was completed successfully. Review the amount, service and transaction reference.",
};

export default function PaymentSuccessPage() {
  // MOCK ONLY: the real page reads session_id and calls the protected verify
  // endpoint (owner, M9). Do not read searchParams here.
  return (
    <PaymentResult
      status="success"
      amount={95}
      transactionId="pi_mock_0001"
      serviceTitle="Refrigerator Cooling Repair"
    />
  );
}
