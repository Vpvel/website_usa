import { NextResponse } from "next/server";
import {
  maskEmailSettings,
  readEmailSettings,
  writeEmailSettings,
} from "@/data/datasources/email-settings.server";
import {
  defaultEmailSettings,
  type EmailSettings,
} from "@/domain/entities/email-settings";

export async function GET() {
  const settings = await readEmailSettings();
  return NextResponse.json({ settings: maskEmailSettings(settings) });
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<EmailSettings>;
    const current = await readEmailSettings();
    const defaults = defaultEmailSettings();

    const keepSecret = (incoming: string | undefined, existing: string) => {
      if (!incoming || incoming.includes("•")) return existing;
      return incoming;
    };

    const next: EmailSettings = {
      ...defaults,
      ...current,
      ...body,
      enabled: Boolean(body.enabled),
      provider: body.provider === "resend" ? "resend" : "smtp",
      fromName: String(body.fromName ?? current.fromName).trim(),
      fromEmail: String(body.fromEmail ?? current.fromEmail).trim(),
      replyToFallback: String(
        body.replyToFallback ?? current.replyToFallback,
      ).trim(),
      sampleTo: String(body.sampleTo ?? current.sampleTo).trim(),
      generalTo: String(body.generalTo ?? current.generalTo).trim(),
      cc: String(body.cc ?? current.cc).trim(),
      subjectSamplePrefix: String(
        body.subjectSamplePrefix ?? current.subjectSamplePrefix,
      ).trim(),
      subjectGeneralPrefix: String(
        body.subjectGeneralPrefix ?? current.subjectGeneralPrefix,
      ).trim(),
      smtp: {
        ...current.smtp,
        ...(body.smtp ?? {}),
        host: String(body.smtp?.host ?? current.smtp.host).trim(),
        port: Number(body.smtp?.port ?? current.smtp.port) || 587,
        secure: Boolean(body.smtp?.secure ?? current.smtp.secure),
        user: String(body.smtp?.user ?? current.smtp.user).trim(),
        pass: keepSecret(body.smtp?.pass, current.smtp.pass),
      },
      resend: {
        apiKey: keepSecret(body.resend?.apiKey, current.resend.apiKey),
      },
      updatedAt: new Date().toISOString(),
    };

    if (next.enabled) {
      if (!next.fromEmail || !next.sampleTo || !next.generalTo) {
        return NextResponse.json(
          {
            error:
              "From email, sample recipient, and general recipient are required when email is enabled.",
          },
          { status: 400 },
        );
      }
      if (next.provider === "smtp" && (!next.smtp.host || !next.smtp.user)) {
        return NextResponse.json(
          { error: "SMTP host and username are required for SMTP mode." },
          { status: 400 },
        );
      }
      if (next.provider === "resend" && !next.resend.apiKey) {
        return NextResponse.json(
          { error: "Resend API key is required for Resend mode." },
          { status: 400 },
        );
      }
    }

    const saved = await writeEmailSettings(next);
    return NextResponse.json({ settings: maskEmailSettings(saved) });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to save settings.",
      },
      { status: 500 },
    );
  }
}
