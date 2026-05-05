import { NextResponse } from "next/server";
import {
  getFromAddress,
  getMailClient,
  getOwnerEmail,
  isMailConfigured,
} from "@/lib/mail";

const MAX_NAME = 200;
const MAX_MESSAGE = 12000;

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

  const name =
    typeof body === "object" && body !== null && "name" in body
      ? String((body as { name: unknown }).name ?? "").trim()
      : "";
  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim()
      : "";
  const type =
    typeof body === "object" && body !== null && "type" in body
      ? String((body as { type: unknown }).type ?? "").trim()
      : "";
  const message =
    typeof body === "object" && body !== null && "message" in body
      ? String((body as { message: unknown }).message ?? "").trim()
      : "";

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!type) {
    return NextResponse.json({ error: "Please choose a message type." }, { status: 400 });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }

  const resend = getMailClient();
  if (!resend) {
    return NextResponse.json({ error: "Mail client unavailable." }, { status: 503 });
  }

  const owner = getOwnerEmail();
  const from = getFromAddress();

  const text = [
    `New message via UnnecessaryApps.com /contact`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Type: ${type}`,
    ``,
    message,
  ].join("\n");

  const html = `
    <p><strong>New contact form submission</strong></p>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
    <strong>Email:</strong> ${escapeHtml(email)}<br/>
    <strong>Type:</strong> ${escapeHtml(type)}</p>
    <hr/>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: owner,
    replyTo: email,
    subject: `[UnnecessaryApps] ${type} — ${name}`,
    text,
    html,
  });

  if (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Could not send email. Try again in a moment." },
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
