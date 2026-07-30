import { NextResponse } from "next/server";
import {
  normalizeAdminSeoContent,
  readSeoSettings,
  writeSeoSettings,
} from "@/data/datasources/seo-settings.server";
import type { AdminSeoContent } from "@/domain/entities/seo-content";

export async function GET() {
  const settings = await readSeoSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<AdminSeoContent>;
    const current = await readSeoSettings();
    const next = normalizeAdminSeoContent({
      ...current,
      ...body,
      customMeta: body.customMeta ?? current.customMeta,
      routes: body.routes ?? current.routes,
    });

    if (!next.siteName || !next.defaultTitle || !next.defaultDescription) {
      return NextResponse.json(
        {
          error: "Site name, default title, and default description are required.",
        },
        { status: 400 },
      );
    }

    const saved = await writeSeoSettings(next);
    return NextResponse.json({ settings: saved });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to save SEO settings.",
      },
      { status: 500 },
    );
  }
}
