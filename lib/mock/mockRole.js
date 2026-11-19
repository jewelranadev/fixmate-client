// TEMPORARY MOCK: replaced by real session role during manual integration (M13).
// Derives a mock role from the pathname and returns a mock user object.
// Contains NO authentication, sessions, redirects or route protection.

export function roleFromPathname(pathname) {
  if (!pathname) return "customer";
  if (pathname.startsWith("/dashboard/admin")) return "admin";
  if (pathname.startsWith("/dashboard/technician")) return "technician";
  return "customer";
}

export const MOCK_USERS = {
  customer: {
    name: "Sarah Ahmed",
    email: "sarah.ahmed@fixmate.example",
    initials: "SA",
    role: "customer",
  },
  technician: {
    name: "Marcus Hale",
    email: "marcus.hale@fixmate.example",
    initials: "MH",
    role: "technician",
  },
  admin: {
    name: "Sara Lin",
    email: "sara.lin@fixmate.example",
    initials: "SL",
    role: "admin",
  },
};

export function mockUserForRole(role) {
  return MOCK_USERS[role] || MOCK_USERS.customer;
}
