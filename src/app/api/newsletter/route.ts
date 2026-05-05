import { NextResponse } from "next/server";
import {
  getFromAddress,
  getMailClient,
  getOwnerEmail,
  isMailConfigured,
} from "@/lib/mail";

export async function POST(req: Request) {
  if (!isMailConfigured()) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Add RESEND_API_KEY on the server (see deployment docs).",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim()
      : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const resend = getMailClient();
  if (!resend) {
    return NextResponse.json({ error: "Mail client unavailable." }, { status: 503 });
  }

  const owner = getOwnerEmail();
  const from = getFromAddress();

  const text = [
    `Someone subscribed to pointless updates on UnnecessaryApps.com`,
    ``,
    `Subscriber email: ${email}`,
    ``,
    `(They agreed via the footer newsletter box.)`,
  ].join("\n");

  const html = `
    <p><strong>New newsletter signup</strong></p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><small>Submitted from the site footer.</small></p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: owner,
    replyTo: email,
    subject: `[UnnecessaryApps] Newsletter signup — ${email}`,
    text,
    html,
  });

  if (error) {
    console.error("[newsletter]", error);
    return NextResponse.json(
      { error: "Could not send notification. Try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
