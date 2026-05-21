/**
 * Formspree integration (React + AJAX fetch).
 * Matches: https://help.formspree.io — Submit forms with JavaScript (AJAX)
 *
 * We use fetch instead of @formspree/react to keep the existing
 * Framer Motion UI, validation, and loading/success/error states.
 */

/** Form ID from Formspree dashboard — used in endpoint URL */
export const FORMSPREE_FORM_ID = "mykvwekl";

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export function getFormspreeEndpoint(): string {
  const url = process.env.NEXT_PUBLIC_FORMSPREE_URL?.trim();
  return url || FORMSPREE_ENDPOINT;
}

export type FormspreePayload = {
  name: string;
  email: string;
  message: string;
  gotcha?: string;
};

export type FormspreeSubmitResult =
  | { ok: true }
  | { ok: false; message: string };

export async function submitToFormspree(
  data: FormspreePayload,
  endpointOverride?: string
): Promise<FormspreeSubmitResult> {
  const endpoint = endpointOverride?.trim() || getFormspreeEndpoint();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      _replyto: data.email,
      _gotcha: data.gotcha ?? "",
    }),
  });

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (response.ok) {
    return { ok: true };
  }

  const parsed = body as {
    error?: string;
    errors?: Array<{ message?: string }>;
  };

  const message =
    parsed?.error ??
    parsed?.errors?.[0]?.message ??
    "Failed to send message. Please try again.";

  return { ok: false, message };
}
