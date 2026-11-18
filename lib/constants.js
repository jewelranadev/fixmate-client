// Shared service taxonomy — these values must match the assignment schema
// exactly. Plain data + one URL helper; no logic.

export const CATEGORIES = [
  "Smartphone",
  "Laptop & PC",
  "AC",
  "Refrigerator",
  "TV",
  "Washing Machine",
  "Electrical",
];

export const SERVICE_MODES = ["Home Visit", "Shop Drop-off"];

// Builds the /services filter link for a category card.
export function categoryHref(name) {
  return `/services?category=${encodeURIComponent(name)}`;
}
