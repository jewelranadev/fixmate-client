// TEMPORARY MOCK DATA: replaced by API data during manual integration.
// Bookings for the signed-in mock technician (Marcus Hale). Field names match
// the assignment booking schema exactly:
// _id, serviceId, serviceTitle, serviceImage, category, basePrice,
// technicianName, technicianEmail, customerName, customerEmail,
// customerPhone, address, preferredDate ("YYYY-MM-DD"), problemDescription,
// status, finalAmount, paymentStatus, createdAt.
//
// status: "requested" | "accepted" | "in-progress" | "completed" | "rejected" | "cancelled"
// paymentStatus: "unpaid" | "paid"
// finalAmount stays equal to basePrice until the technician closes a job;
// the completed+unpaid row deliberately has a different final amount.
//
// Service copies come from technicianServices.js so id / title / price /
// image / category cannot drift.

import { technician, technicianServices } from "./technicianServices";

function serviceCopy(serviceId) {
  const service = technicianServices.find((item) => item._id === serviceId);

  return {
    serviceId: service._id,
    serviceTitle: service.title,
    serviceImage: service.image,
    category: service.category,
    basePrice: service.basePrice,
    technicianName: technician.name,
    technicianEmail: technician.email,
  };
}

export const technicianRequests = [
  {
    _id: "bk_t001",
    ...serviceCopy("svc_005"),
    customerName: "Rahim Uddin",
    customerEmail: "rahim.uddin@fixmate.example",
    customerPhone: "+880 1700 000 301",
    address: "House 8, Road 11, Banani, Dhaka",
    preferredDate: "2026-11-24",
    problemDescription:
      "Both AC units drip onto the floor after an hour of running and the airflow smells musty.",
    status: "requested",
    finalAmount: 55,
    paymentStatus: "unpaid",
    createdAt: "2026-11-18T07:45:00.000Z",
  },
  {
    _id: "bk_t002",
    ...serviceCopy("svc_001"),
    customerName: "Farhana Akter",
    customerEmail: "farhana.akter@fixmate.example",
    customerPhone: "+880 1700 000 302",
    address: "Flat 4B, Road 27, Dhanmondi, Dhaka",
    preferredDate: "2026-11-23",
    problemDescription:
      "Screen cracked after a fall and the touch layer no longer responds on the left half.",
    status: "requested",
    finalAmount: 89,
    paymentStatus: "unpaid",
    createdAt: "2026-11-17T15:10:00.000Z",
  },
  {
    _id: "bk_t003",
    ...serviceCopy("svc_013"),
    customerName: "Imran Hossain",
    customerEmail: "imran.hossain@fixmate.example",
    customerPhone: "+880 1700 000 303",
    address: "House 22, Road 3, Uttara, Dhaka",
    preferredDate: "2026-11-21",
    problemDescription:
      "The main breaker trips whenever the water pump starts, so we have to reset it several times a day.",
    status: "accepted",
    finalAmount: 45,
    paymentStatus: "unpaid",
    createdAt: "2026-11-16T09:05:00.000Z",
  },
  {
    _id: "bk_t004",
    ...serviceCopy("svc_009"),
    customerName: "Nusrat Jahan",
    customerEmail: "nusrat.jahan@fixmate.example",
    customerPhone: "+880 1700 000 304",
    address: "House 5, Road 8, Gulshan, Dhaka",
    preferredDate: "2026-11-18",
    problemDescription:
      "The TV turns on but the picture stays black; sound works and the standby light keeps blinking.",
    status: "in-progress",
    finalAmount: 95,
    paymentStatus: "unpaid",
    createdAt: "2026-11-14T12:30:00.000Z",
  },
  {
    _id: "bk_t005",
    ...serviceCopy("svc_001"),
    customerName: "Tanvir Ahmed",
    customerEmail: "tanvir.ahmed@fixmate.example",
    customerPhone: "+880 1700 000 305",
    address: "House 17, Road 6, Mohammadpur, Dhaka",
    preferredDate: "2026-11-10",
    problemDescription:
      "Battery expanded and lifted the screen; the phone still works but the case will not sit flat.",
    status: "completed",
    finalAmount: 105,
    paymentStatus: "unpaid",
    createdAt: "2026-11-08T10:20:00.000Z",
  },
  {
    _id: "bk_t006",
    ...serviceCopy("svc_005"),
    customerName: "Rahim Uddin",
    customerEmail: "rahim.uddin@fixmate.example",
    customerPhone: "+880 1700 000 301",
    address: "House 8, Road 11, Banani, Dhaka",
    preferredDate: "2026-11-05",
    problemDescription:
      "Annual deep clean for the bedroom unit before the summer season starts next month.",
    status: "completed",
    finalAmount: 55,
    paymentStatus: "paid",
    createdAt: "2026-11-03T08:50:00.000Z",
  },
  {
    _id: "bk_t007",
    ...serviceCopy("svc_009"),
    customerName: "Farhana Akter",
    customerEmail: "farhana.akter@fixmate.example",
    customerPhone: "+880 1700 000 302",
    address: "Flat 4B, Road 27, Dhanmondi, Dhaka",
    preferredDate: "2026-11-09",
    problemDescription:
      "Old 32-inch TV has lines across the panel; would like a quote before deciding on a repair.",
    status: "rejected",
    finalAmount: 95,
    paymentStatus: "unpaid",
    createdAt: "2026-11-07T17:35:00.000Z",
  },
  {
    _id: "bk_t008",
    ...serviceCopy("svc_013"),
    customerName: "Nusrat Jahan",
    customerEmail: "nusrat.jahan@fixmate.example",
    customerPhone: "+880 1700 000 304",
    address: "House 5, Road 8, Gulshan, Dhaka",
    preferredDate: "2026-11-06",
    problemDescription:
      "Requested a breaker replacement, then decided to postpone the work until after the holidays.",
    status: "cancelled",
    finalAmount: 45,
    paymentStatus: "unpaid",
    createdAt: "2026-11-04T13:25:00.000Z",
  },
  {
    _id: "bk_t009",
    ...serviceCopy("svc_005"),
    customerName: "Imran Hossain",
    customerEmail: "imran.hossain@fixmate.example",
    customerPhone: "+880 1700 000 303",
    address: "House 22, Road 3, Uttara, Dhaka",
    preferredDate: "2026-11-25",
    problemDescription:
      "Outdoor unit makes a rattling noise at start-up and the cooling takes a long time to begin.",
    status: "requested",
    finalAmount: 55,
    paymentStatus: "unpaid",
    createdAt: "2026-11-18T09:15:00.000Z",
  },
];
