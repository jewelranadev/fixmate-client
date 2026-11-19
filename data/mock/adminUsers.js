// TEMPORARY MOCK DATA: replaced by API data during manual integration.
// Admin-side user directory. Field names match the assignment user schema:
// _id, name, email, image, role, phone, area, bio, createdAt.
//
// `image` is intentionally empty: every avatar in the UI is the initials
// fallback until profile images are wired (ImgBB, M3). Technicians are taken
// from data/mock/technicians.js so names, emails, phones and areas never
// drift; the customers are the same people used by the mock bookings.
// All emails use the reserved @fixmate.example domain.

import { technicians } from "./technicians";

const TECHNICIAN_JOINED = [
  "2026-02-18T09:00:00.000Z",
  "2026-03-06T09:00:00.000Z",
  "2026-04-22T09:00:00.000Z",
  "2026-06-11T09:00:00.000Z",
];

// The signed-in mock admin. Keep lib/mock/mockRole.js in sync with this row.
export const currentAdmin = {
  _id: "usr_001",
  name: "Sara Lin",
  email: "sara.lin@fixmate.example",
  image: "",
  role: "admin",
  phone: "+880 1700 000 100",
  area: "Banani, Dhaka",
  bio: "Runs day-to-day FixMate operations: account reviews, technician approvals and the payment queue.",
  createdAt: "2026-01-09T08:30:00.000Z",
};

const technicianUsers = technicians.map((technician, index) => ({
  _id: `usr_00${index + 2}`,
  name: technician.name,
  email: technician.email,
  image: "",
  role: "technician",
  phone: technician.phone,
  area: technician.area,
  bio: technician.bio,
  createdAt: TECHNICIAN_JOINED[index],
}));

const customerUsers = [
  {
    _id: "usr_006",
    name: "Sarah Ahmed",
    email: "sarah.ahmed@fixmate.example",
    image: "",
    role: "customer",
    phone: "+880 1700 000 200",
    area: "Mirpur, Dhaka",
    bio: "Books home appliance and phone repairs for a shared family flat in Mirpur.",
    createdAt: "2026-05-14T10:20:00.000Z",
  },
  {
    _id: "usr_007",
    name: "Rahim Uddin",
    email: "rahim.uddin@fixmate.example",
    image: "",
    role: "customer",
    phone: "+880 1700 000 301",
    area: "Banani, Dhaka",
    bio: "Keeps two rental flats running; books AC servicing and electrical work each season.",
    createdAt: "2026-06-02T14:45:00.000Z",
  },
  {
    _id: "usr_008",
    name: "Farhana Akter",
    email: "farhana.akter@fixmate.example",
    image: "",
    role: "customer",
    phone: "+880 1700 000 302",
    area: "Dhanmondi, Dhaka",
    bio: "Small design studio owner who needs laptops and phones back in service quickly.",
    createdAt: "2026-07-19T11:05:00.000Z",
  },
  {
    _id: "usr_009",
    name: "Imran Hossain",
    email: "imran.hossain@fixmate.example",
    image: "",
    role: "customer",
    phone: "+880 1700 000 303",
    area: "Uttara, Dhaka",
    bio: "Books appliance repairs for a family home and prefers weekend appointments.",
    createdAt: "2026-08-23T09:40:00.000Z",
  },
  {
    _id: "usr_010",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@fixmate.example",
    image: "",
    role: "customer",
    phone: "+880 1700 000 304",
    area: "Gulshan, Dhaka",
    bio: "Works from home and books TV, AC and washing machine repairs around meetings.",
    createdAt: "2026-09-30T16:15:00.000Z",
  },
];

export const adminUsers = [currentAdmin, ...technicianUsers, ...customerUsers];
