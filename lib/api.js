import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, { method = "GET", body, auth = true } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";

  if (auth) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) throw new Error("Please sign in again");
    headers.Authorization = `Bearer ${data.token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(json.message || "Request failed");
    err.status = response.status;
    err.errors = json.errors;
    throw err;
  }
  return json;
}