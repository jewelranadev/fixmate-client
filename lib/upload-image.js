// Sends a File to our own /api/upload route and returns the hosted image URL
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