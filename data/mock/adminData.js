// TEMPORARY MOCK DATA: replaced by API data during manual integration.
// Admin-side aggregates for the overview, moderation, bookings and
// transactions pages. Nothing here is fetched, filtered or saved.
//
// allServices  — data/mock/services.js + data/mock/technicianServices.js,
//                de-duplicated by _id (the services.js copy wins), plus three
//                admin-only rows so the moderation queue has enough variety:
//                4 pending (svc_015, svc_016, svc_018, svc_019) and
//                2 rejected (svc_017, svc_020) overall.
// allBookings  — 12 bookings covering all six statuses, with service copies
//                taken from allServices and customer identity taken from
//                adminUsers so names/emails cannot drift.
// allPayments  — one payment per paid booking; amount always equals the
//                booking's finalAmount.

import { services } from "./services";
import { technicianServices } from "./technicianServices";
import { adminUsers } from "./adminUsers";

/* ---------------------------------------------------------------- services */

const extraServices = [
  {
    _id: "svc_018",
    title: "Laptop Battery Replacement",
    category: "Laptop & PC",
    description:
      "Swollen or short-lived laptop battery replaced with a matching pack, then calibrated and load-tested before pickup.",
    image: "/images/laptop-internals.jpg",
    basePrice: 75,
    estimatedDuration: "1 day",
    serviceMode: "Shop Drop-off",
    serviceArea: "Gulshan, Dhaka",
    technicianName: "Sadia Islam",
    technicianEmail: "sadia.islam@fixmate.example",
    approvalStatus: "pending",
    isAvailable: true,
    createdAt: "2026-11-18T08:20:00.000Z",
  },
  {
    _id: "svc_019",
    title: "Smart TV Software Reset",
    category: "TV",
    description:
      "Firmware reset and app reinstallation for smart TVs that freeze or drop streaming apps, with network settings restored.",
    image: "/images/tv-wall.jpg",
    basePrice: 30,
    estimatedDuration: "1-2 hours",
    serviceMode: "Home Visit",
    serviceArea: "Dhanmondi, Dhaka",
    technicianName: "Nadia Rahman",
    technicianEmail: "nadia.rahman@fixmate.example",
    approvalStatus: "pending",
    isAvailable: true,
    createdAt: "2026-11-17T13:35:00.000Z",
  },
  {
    _id: "svc_020",
    title: "Washer Drain Pump Replacement",
    category: "Washing Machine",
    description:
      "Blocked or burnt-out drain pump replaced, with the filter cleaned and a full drain cycle run before handover.",
    image: "/images/washing-machine.jpg",
    basePrice: 65,
    estimatedDuration: "1-2 hours",
    serviceMode: "Home Visit",
    serviceArea: "Uttara, Dhaka",
    technicianName: "Tariq Chowdhury",
    technicianEmail: "tariq.chowdhury@fixmate.example",
    approvalStatus: "rejected",
    isAvailable: false,
    createdAt: "2026-11-05T15:50:00.000Z",
  },
];

const serviceById = new Map();

[...services, ...technicianServices, ...extraServices].forEach((service) => {
  if (!serviceById.has(service._id)) serviceById.set(service._id, service);
});

export const allServices = Array.from(serviceById.values());

/* ---------------------------------------------------------------- bookings */

const customerByEmail = new Map(
  adminUsers
    .filter((user) => user.role === "customer")
    .map((user) => [user.email, user]),
);

// Booking addresses are not part of the user record, so they live here.
const ADDRESSES = {
  "sarah.ahmed@fixmate.example": "House 12, Road 5, Mirpur, Dhaka",
  "rahim.uddin@fixmate.example": "House 8, Road 11, Banani, Dhaka",
  "farhana.akter@fixmate.example": "Flat 4B, Road 27, Dhanmondi, Dhaka",
  "imran.hossain@fixmate.example": "House 22, Road 3, Uttara, Dhaka",
  "nusrat.jahan@fixmate.example": "House 5, Road 8, Gulshan, Dhaka",
};

function makeBooking({
  _id,
  serviceId,
  customerEmail,
  preferredDate,
  problemDescription,
  status,
  finalAmount,
  paymentStatus = "unpaid",
  createdAt,
}) {
  const service = serviceById.get(serviceId);
  const customer = customerByEmail.get(customerEmail);

  return {
    _id,
    serviceId: service._id,
    serviceTitle: service.title,
    serviceImage: service.image,
    category: service.category,
    basePrice: service.basePrice,
    technicianName: service.technicianName,
    technicianEmail: service.technicianEmail,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    address: ADDRESSES[customer.email],
    preferredDate,
    problemDescription,
    status,
    finalAmount: finalAmount ?? service.basePrice,
    paymentStatus,
    createdAt,
  };
}

export const allBookings = [
  makeBooking({
    _id: "bk_a001",
    serviceId: "svc_005",
    customerEmail: "sarah.ahmed@fixmate.example",
    preferredDate: "2026-11-24",
    problemDescription:
      "Indoor unit drips onto the floor after an hour and the airflow smells musty; both units need a clean.",
    status: "requested",
    createdAt: "2026-11-18T07:40:00.000Z",
  }),
  makeBooking({
    _id: "bk_a002",
    serviceId: "svc_001",
    customerEmail: "rahim.uddin@fixmate.example",
    preferredDate: "2026-11-23",
    problemDescription:
      "Screen cracked after a fall and the left half of the touch layer no longer responds to taps.",
    status: "requested",
    createdAt: "2026-11-17T16:05:00.000Z",
  }),
  makeBooking({
    _id: "bk_a003",
    serviceId: "svc_003",
    customerEmail: "farhana.akter@fixmate.example",
    preferredDate: "2026-11-22",
    problemDescription:
      "Several keys stopped responding after a small spill and the keyboard backlight stays off.",
    status: "accepted",
    createdAt: "2026-11-16T11:30:00.000Z",
  }),
  makeBooking({
    _id: "bk_a004",
    serviceId: "svc_013",
    customerEmail: "imran.hossain@fixmate.example",
    preferredDate: "2026-11-21",
    problemDescription:
      "The main breaker trips whenever the water pump starts, so it has to be reset several times a day.",
    status: "accepted",
    createdAt: "2026-11-15T09:10:00.000Z",
  }),
  makeBooking({
    _id: "bk_a005",
    serviceId: "svc_009",
    customerEmail: "nusrat.jahan@fixmate.example",
    preferredDate: "2026-11-18",
    problemDescription:
      "The TV turns on but the picture stays black; sound works and the standby light keeps blinking.",
    status: "in-progress",
    createdAt: "2026-11-14T12:25:00.000Z",
  }),
  makeBooking({
    _id: "bk_a006",
    serviceId: "svc_006",
    customerEmail: "sarah.ahmed@fixmate.example",
    preferredDate: "2026-11-19",
    problemDescription:
      "Cooling dropped sharply this month and the outdoor unit makes a hissing noise at start-up.",
    status: "in-progress",
    createdAt: "2026-11-13T08:55:00.000Z",
  }),
  makeBooking({
    _id: "bk_a007",
    serviceId: "svc_001",
    customerEmail: "imran.hossain@fixmate.example",
    preferredDate: "2026-11-12",
    problemDescription:
      "Battery expanded and lifted the screen; the phone still works but the case will not sit flat.",
    status: "completed",
    finalAmount: 105,
    createdAt: "2026-11-10T10:20:00.000Z",
  }),
  makeBooking({
    _id: "bk_a008",
    serviceId: "svc_007",
    customerEmail: "sarah.ahmed@fixmate.example",
    preferredDate: "2026-11-09",
    problemDescription:
      "The freezer still works but the main compartment stays warm even at the coldest setting.",
    status: "completed",
    finalAmount: 95,
    paymentStatus: "paid",
    createdAt: "2026-11-07T15:45:00.000Z",
  }),
  makeBooking({
    _id: "bk_a009",
    serviceId: "svc_011",
    customerEmail: "rahim.uddin@fixmate.example",
    preferredDate: "2026-11-06",
    problemDescription:
      "The drum fills with water but the cycle stops before draining, leaving the clothes soaked.",
    status: "completed",
    finalAmount: 75,
    paymentStatus: "paid",
    createdAt: "2026-11-04T12:00:00.000Z",
  }),
  makeBooking({
    _id: "bk_a010",
    serviceId: "svc_005",
    customerEmail: "farhana.akter@fixmate.example",
    preferredDate: "2026-11-03",
    problemDescription:
      "Annual deep clean for the bedroom unit before the summer season starts next month.",
    status: "completed",
    finalAmount: 60,
    paymentStatus: "paid",
    createdAt: "2026-11-01T08:50:00.000Z",
  }),
  makeBooking({
    _id: "bk_a011",
    serviceId: "svc_012",
    customerEmail: "nusrat.jahan@fixmate.example",
    preferredDate: "2026-10-30",
    problemDescription:
      "The machine hums but the drum does not spin, and there is a burning smell after a few minutes.",
    status: "rejected",
    createdAt: "2026-10-28T09:15:00.000Z",
  }),
  makeBooking({
    _id: "bk_a012",
    serviceId: "svc_010",
    customerEmail: "sarah.ahmed@fixmate.example",
    preferredDate: "2026-10-26",
    problemDescription:
      "Need a 55-inch TV mounted on a plaster wall with the cables hidden behind the panel.",
    status: "cancelled",
    createdAt: "2026-10-24T17:35:00.000Z",
  }),
];

/* ---------------------------------------------------------------- payments */

const PAID_AT = {
  bk_a008: "2026-11-10T11:05:00.000Z",
  bk_a009: "2026-11-07T15:40:00.000Z",
  bk_a010: "2026-11-04T09:25:00.000Z",
};

export const allPayments = allBookings
  .filter((booking) => booking.paymentStatus === "paid")
  .map((booking, index) => ({
    _id: `pay_a00${index + 1}`,
    bookingId: booking._id,
    serviceTitle: booking.serviceTitle,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    technicianName: booking.technicianName,
    technicianEmail: booking.technicianEmail,
    amount: booking.finalAmount,
    currency: "usd",
    transactionId: `pi_mock_a00${index + 1}`,
    stripeSessionId: `cs_test_mock_a00${index + 1}`,
    paymentStatus: "paid",
    paidAt: PAID_AT[booking._id],
  }));
