const DASHBOARDS = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
};

export const dashboardFor = (role) => DASHBOARDS[role] ?? DASHBOARDS.customer;

// Only allow in-site paths. "//evil.com" or "https://..." would be an open redirect.
export const safeRedirect = (target, fallback) =>
  typeof target === "string" && target.startsWith("/") && !target.startsWith("//") ? target : fallback;