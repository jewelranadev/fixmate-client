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