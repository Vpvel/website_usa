import { NextResponse } from "next/server";
import { readEmailSettings } from "@/data/datasources/email-settings.server";
import { sendContactEmail } from "@/data/datasources/email-sender.server";
import type { ContactEmailPayload } from "@/domain/entities/email-settings";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactEmailPayload>;
    const type = body.type === "sample" ? "sample" : "general";
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    if (type === "sample" && !String(body.interest ?? "").trim()) {
      return NextResponse.json(
        { error: "Product / application interest is required." },
        { status: 400 },
      );
    }

    if (type === "general" && !String(body.message ?? "").trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const payload: ContactEmailPayload = {
      type,
      name,
      email,
      company: String(body.company ?? "").trim() || undefined,
      phone: String(body.phone ?? "").trim() || undefined,
      interest: String(body.interest ?? "").trim() || undefined,
      notes: String(body.notes ?? "").trim() || undefined,
      message: String(body.message ?? "").trim() || undefined,
    };

    const settings = await readEmailSettings();
    const result = await sendContactEmail(settings, payload);

    return NextResponse.json({
      ok: true,
      emailed: result.sent,
      message: result.sent
        ? "Email sent successfully."
        : "Request received. Email sending is currently turned off in admin.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process contact request.",
      },
      { status: 500 },
    );
  }
}
