import { auth } from "@/lib/auth";

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED = ["image/png", "image/jpeg", "image/webp"];

export async function POST(request) {
  // Only signed-in users may upload (otherwise anyone could use our ImgBB key)
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return Response.json({ success: false, message: "Please sign in to upload images" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("image");

    if (!file || typeof file === "string") {
      return Response.json({ success: false, message: "No image was provided" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return Response.json({ success: false, message: "Only PNG, JPG or WebP images are allowed" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return Response.json({ success: false, message: "Image must be 2 MB or smaller" }, { status: 400 });
    }

    const body = new FormData();
    body.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: "POST",
      body,
    });
    const json = await response.json().catch(() => ({}));

    if (!response.ok || !json?.success) {
      return Response.json({ success: false, message: "Image upload failed. Please try again" }, { status: 502 });
    }

    return Response.json({ success: true, url: json.data.display_url });
  } catch (error) {
    console.error("POST /api/upload failed:", error);
    return Response.json({ success: false, message: "Image upload failed" }, { status: 500 });
  }
}