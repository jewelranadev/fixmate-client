// TEMPORARY MOCK DATA: replaced by API data during manual integration.
// Field names match the assignment payment schema exactly:
// _id, bookingId, serviceTitle, customerName, customerEmail, technicianName,
// technicianEmail, amount, currency, transactionId, stripeSessionId,
// paymentStatus, paidAt.
//
// One row per paid booking. Amounts equal that booking's finalAmount from
// data/mock/bookings.js. Identifiers are obviously fake test values.

export const payments = [
  {
    _id: "pay_001",
    bookingId: "bk_005",
    serviceTitle: "iPhone Screen Replacement",
    customerName: "Sarah Ahmed",
    customerEmail: "sarah.ahmed@fixmate.example",
    technicianName: "Marcus Hale",
    technicianEmail: "marcus.hale@fixmate.example",
    amount: 89,
    currency: "usd",
    transactionId: "pi_mock_0001",
    stripeSessionId: "cs_test_mock_0001",
    paymentStatus: "paid",
    paidAt: "2026-11-09T11:05:00.000Z",
  },
  {
    _id: "pay_002",
    bookingId: "bk_006",
    serviceTitle: "Front-Load Washer Repair",
    customerName: "Sarah Ahmed",
    customerEmail: "sarah.ahmed@fixmate.example",
    technicianName: "Tariq Chowdhury",
    technicianEmail: "tariq.chowdhury@fixmate.example",
    amount: 75,
    currency: "usd",
    transactionId: "pi_mock_0002",
    stripeSessionId: "cs_test_mock_0002",
    paymentStatus: "paid",
    paidAt: "2026-11-05T15:40:00.000Z",
  },
];
