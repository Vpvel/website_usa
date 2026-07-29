import nodemailer from "nodemailer";
import type {
  ContactEmailPayload,
  EmailSettings,
} from "@/domain/entities/email-settings";

function splitEmails(value: string) {
  return value
    .split(/[,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildSubject(settings: EmailSettings, payload: ContactEmailPayload) {
  const prefix =
    payload.type === "sample"
      ? settings.subjectSamplePrefix
      : settings.subjectGeneralPrefix;
  return `${prefix} ${payload.name}`.trim();
}

function buildTextBody(payload: ContactEmailPayload) {
  if (payload.type === "sample") {
    return [
      "New sample request from the website contact form.",
      "",
      `Name: ${payload.name}`,
      `Company: ${payload.company ?? "—"}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "—"}`,
      `Interest: ${payload.interest ?? "—"}`,
      `Notes: ${payload.notes || "—"}`,
    ].join("\n");
  }

  return [
    "New contact message from the website.",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Message: ${payload.message ?? "—"}`,
  ].join("\n");
}

function buildHtmlBody(payload: ContactEmailPayload) {
  const rows =
    payload.type === "sample"
      ? [
          ["Name", payload.name],
          ["Company", payload.company ?? "—"],
          ["Email", payload.email],
          ["Phone", payload.phone || "—"],
          ["Interest", payload.interest ?? "—"],
          ["Notes", payload.notes || "—"],
        ]
      : [
          ["Name", payload.name],
          ["Email", payload.email],
          ["Message", payload.message ?? "—"],
        ];

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #d7e3db;font-weight:600;color:#14231b">${label}</td><td style="padding:8px 12px;border:1px solid #d7e3db;color:#14231b">${String(value).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto">
      <h2 style="color:#1b6b45;margin:0 0 12px">${payload.type === "sample" ? "Sample request" : "Contact message"}</h2>
      <table style="border-collapse:collapse;width:100%">${table}</table>
    </div>
  `;
}

async function sendViaSmtp(settings: EmailSettings, payload: ContactEmailPayload) {
  if (!settings.smtp.host || !settings.smtp.user) {
    throw new Error("SMTP host and username are required.");
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtp.host,
    port: settings.smtp.port || 587,
    secure: settings.smtp.secure,
    auth: {
      user: settings.smtp.user,
      pass: settings.smtp.pass,
    },
  });

  const to =
    payload.type === "sample" ? settings.sampleTo : settings.generalTo;

  await transporter.sendMail({
    from: `"${settings.fromName}" <${settings.fromEmail}>`,
    to: splitEmails(to).join(", "),
    cc: splitEmails(settings.cc).join(", ") || undefined,
    replyTo: payload.email || settings.replyToFallback,
    subject: buildSubject(settings, payload),
    text: buildTextBody(payload),
    html: buildHtmlBody(payload),
  });
}

async function sendViaResend(
  settings: EmailSettings,
  payload: ContactEmailPayload,
) {
  if (!settings.resend.apiKey) {
    throw new Error("Resend API key is required.");
  }

  const to =
    payload.type === "sample" ? settings.sampleTo : settings.generalTo;
  const recipients = splitEmails(to);
  if (!recipients.length) {
    throw new Error("Recipient email is required.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${settings.resend.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${settings.fromName} <${settings.fromEmail}>`,
      to: recipients,
      cc: splitEmails(settings.cc),
      reply_to: payload.email || settings.replyToFallback,
      subject: buildSubject(settings, payload),
      text: buildTextBody(payload),
      html: buildHtmlBody(payload),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend failed: ${detail}`);
  }
}

export async function sendContactEmail(
  settings: EmailSettings,
  payload: ContactEmailPayload,
) {
  if (!settings.enabled) {
    return { sent: false as const, reason: "Email sending is turned off." };
  }

  if (settings.provider === "resend") {
    await sendViaResend(settings, payload);
  } else {
    await sendViaSmtp(settings, payload);
  }

  return { sent: true as const };
}
