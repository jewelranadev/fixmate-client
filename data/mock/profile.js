// TEMPORARY MOCK DATA: replaced by session user during manual integration (M13).
// lib/mock/mockRole.js only carries name / email / initials, so the editable
// profile fields live here. Fictional values on purpose; the customer bio is
// intentionally empty because customers do not appear on service pages.

import { MOCK_USERS } from "@/lib/mock/mockRole";

export const profileUser = {
  name: MOCK_USERS.customer.name,
  email: MOCK_USERS.customer.email,
  image: "",
  role: MOCK_USERS.customer.role,
  phone: "+880 1700 000 200",
  area: "Mirpur, Dhaka",
  bio: "",
  createdAt: "2026-05-14T10:20:00.000Z",
};
