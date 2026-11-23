import { CATEGORIES, SERVICE_MODES } from "@/lib/constants";

const EMAIL = /^\S+@\S+\.\S+$/;

export function validateSignUp({ name, email, password, role }) {
  const errors = {};
  if (!name.trim()) errors.name = "Full name is required";
  if (!email.trim()) errors.email = "Email is required";
  else if (!EMAIL.test(email.trim())) errors.email = "Enter a valid email address";

  if (!password) errors.password = "Password is required";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters";
  else if (!/[A-Z]/.test(password)) errors.password = "Password needs an uppercase letter";
  else if (!/[a-z]/.test(password)) errors.password = "Password needs a lowercase letter";

  if (!["customer", "technician"].includes(role)) errors.role = "Choose Customer or Technician";
  return errors;
}

export function validateSignIn({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!EMAIL.test(email.trim())) errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  return errors;
}

export function validateBookingForm({ customerPhone, address, preferredDate, problemDescription }) {
  const errors = {};
  if (!/^\+?[\d\s-]{7,20}$/.test(customerPhone.trim())) errors.phone = "Enter a valid phone number";
  if (address.trim().length < 5) errors.address = "Address is required";

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  if (!preferredDate) errors.preferredDate = "Choose a date";
  else if (preferredDate < today) errors.preferredDate = "Choose today or a future date";

  if (problemDescription.trim().length < 20) {
    errors.problemDescription = "Describe the problem in at least 20 characters";
  }
  return errors;
}

// Mirrors validateService() in the Express API so the form fails early with
// field-level messages instead of waiting for a 400 response.
export function validateServiceForm({
  title,
  category,
  description,
  estimatedDuration,
  serviceMode,
  serviceArea,
  basePrice,
  image,
}) {
  const errors = {};
  if (!title || title.trim().length < 3) errors.title = "Title must be at least 3 characters";
  if (!CATEGORIES.includes(category)) errors.category = "Choose a valid category";
  if (!description || description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  const price = Number(basePrice);
  if (!Number.isFinite(price) || price <= 0) errors.basePrice = "Base price must be a positive number";
  if (!estimatedDuration || !estimatedDuration.trim()) {
    errors.estimatedDuration = "Estimated duration is required";
  }
  if (!SERVICE_MODES.includes(serviceMode)) {
    errors.serviceMode = "Choose Home Visit or Shop Drop-off";
  }
  if (!serviceArea || !serviceArea.trim()) errors.serviceArea = "Service area is required";
  if (!image) errors.image = "Service image is required";
  else if (!/^https?:\/\//i.test(image)) errors.image = "Image must be a valid URL";

  return errors;
}

export function validateProfileForm({ name, phone, area, bio, image }) {
  const errors = {};
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
  const trimmedArea = typeof area === "string" ? area.trim() : "";
  const trimmedBio = typeof bio === "string" ? bio.trim() : "";
  const trimmedImage = typeof image === "string" ? image.trim() : "";

  if (!trimmedName) errors.name = "Full name is required";
  else if (trimmedName.length > 100) errors.name = "Name is too long";

  if (trimmedPhone && !/^\+?[\d\s-]{7,20}$/.test(trimmedPhone)) {
    errors.phone = "Enter a valid phone number";
  }

  if (trimmedArea.length > 120) errors.area = "Area is too long";

  if (trimmedBio.length > 500) {
    errors.bio = "Bio must be 500 characters or fewer";
  }

  if (trimmedImage && !/^https?:\/\//i.test(trimmedImage)) {
    errors.image = "Image must be a valid URL";
  }

  return errors;
}
