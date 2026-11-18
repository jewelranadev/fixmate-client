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
    name: "Amina Yusuf",
    email: "amina@example.com",
    initials: "AY",
    role: "customer",
  },
  technician: {
    name: "David Chen",
    email: "david.chen@example.com",
    initials: "DC",
    role: "technician",
  },
  admin: {
    name: "Sara Lin",
    email: "sara.lin@fixmate.app",
    initials: "SL",
    role: "admin",
  },
};

export function mockUserForRole(role) {
  return MOCK_USERS[role] || MOCK_USERS.customer;
}
