const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServices({ q, category, serviceMode, sort, limit } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (serviceMode) params.set("serviceMode", serviceMode);
  if (sort) params.set("sort", sort);
  if (limit) params.set("limit", String(limit));

  const response = await fetch(`${API_URL}/api/services?${params.toString()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load services");
  const json = await response.json();
  return json.services;
}

// Returns { service, technician } or null when the service does not exist / is not public
export async function getService(id) {
  const response = await fetch(`${API_URL}/api/services/${encodeURIComponent(id)}`, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to load service");
  const json = await response.json();
  return { service: json.service, technician: json.technician };
}