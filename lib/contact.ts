export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

export type ContactValidationResult =
  | { success: true; data: ContactFormData }
  | { success: false; error: string; field?: keyof ContactFormData };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

export function sanitizeContactInput(data: ContactFormData): ContactFormData {
  return {
    name: stripHtml(data.name).trim().slice(0, MAX_NAME),
    email: stripHtml(data.email).trim().toLowerCase().slice(0, MAX_EMAIL),
    message: stripHtml(data.message).trim().slice(0, MAX_MESSAGE),
  };
}

export function validateContactForm(
  body: unknown
): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return { success: false, error: "Spam detected." };
  }

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (!name) {
    return { success: false, error: "Name is required.", field: "name" };
  }

  if (name.length > MAX_NAME) {
    return {
      success: false,
      error: `Name must be under ${MAX_NAME} characters.`,
      field: "name",
    };
  }

  if (!email) {
    return { success: false, error: "Email is required.", field: "email" };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      success: false,
      error: "Please enter a valid email address.",
      field: "email",
    };
  }

  if (!message) {
    return {
      success: false,
      error: "Message is required.",
      field: "message",
    };
  }

  if (message.length > MAX_MESSAGE) {
    return {
      success: false,
      error: `Message must be under ${MAX_MESSAGE} characters.`,
      field: "message",
    };
  }

  return {
    success: true,
    data: sanitizeContactInput({ name, email, message }),
  };
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
