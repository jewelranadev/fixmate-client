// Sends a File to our own /api/upload route and returns the hosted image URL.
// Keep these values in sync with app/api/upload/route.js.
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2 MB
export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export async function uploadImage(file) {
  const form = new FormData();
  form.append("image", file);

  const response = await fetch("/api/upload", { method: "POST", body: form });
  const json = await response.json().catch(() => ({}));

  if (!response.ok || !json.success) {
    throw new Error(json.message || "Image upload failed");
  }
  return json.url;
}
