import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  escapeHtml,
  sanitizeContactInput,
  validateContactForm,
} from "@/lib/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateContactForm(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error, field: validation.field },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    if (!apiKey || !toEmail) {
      console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 503 }
      );
    }

    const { name, email, message } = sanitizeContactInput(validation.data);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio Contact — ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #09090b; margin: 0 0 16px; font-size: 20px;">New portfolio message</h2>
          <p style="color: #52525b; margin: 0 0 24px; font-size: 14px; line-height: 1.6;">You received a new inquiry from your portfolio contact form.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #71717a; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #09090b; font-weight: 500;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${safeEmail}" style="color: #dc2626;">${safeEmail}</a></td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #fafafa; border-radius: 12px; border: 1px solid #e4e4e7;">
            <p style="margin: 0 0 8px; color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; color: #27272a; font-size: 14px; line-height: 1.7;">${safeMessage}</p>
          </div>
        </div>
      `,
      text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
