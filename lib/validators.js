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