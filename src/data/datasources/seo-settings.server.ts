import { promises as fs } from "node:fs";
import path from "node:path";
import {
  defaultAdminSeoContent,
} from "@/data/datasources/seo-defaults.local";
import type { AdminSeoContent, SeoMetaPair, SeoRouteOverride } from "@/domain/entities/seo-content";

const DATA_DIR = path.join(process.cwd(), ".data");
const SEO_PATH = path.join(DATA_DIR, "seo-settings.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function normalizeMeta(pairs: SeoMetaPair[] | undefined): SeoMetaPair[] {
  if (!Array.isArray(pairs)) return [];
  return pairs
    .map((item) => ({
      key: String(item?.key ?? "").trim(),
      value: String(item?.value ?? "").trim(),
    }))
    .filter((item) => item.key.length > 0);
}

function normalizeRoutes(routes: SeoRouteOverride[] | undefined): SeoRouteOverride[] {
  if (!Array.isArray(routes)) return defaultAdminSeoContent().routes;
  return routes.map((route, index) => ({
    id: String(route?.id ?? `seo-route-${index}`),
    route: String(route?.route ?? "/").trim() || "/",
    enabled: route?.enabled !== false,
    title: String(route?.title ?? "").trim(),
    description: String(route?.description ?? "").trim(),
    keywordsText: String(route?.keywordsText ?? ""),
    ogImage: String(route?.ogImage ?? "").trim(),
    ogImageAlt: String(route?.ogImageAlt ?? "").trim(),
    canonicalPath: String(route?.canonicalPath ?? route?.route ?? "/").trim() || "/",
    noIndex: Boolean(route?.noIndex),
    customMeta: normalizeMeta(route?.customMeta),
  }));
}

export function normalizeAdminSeoContent(
  input?: Partial<AdminSeoContent> | null,
): AdminSeoContent {
  const defaults = defaultAdminSeoContent();
  return {
    ...defaults,
    ...input,
    siteName: String(input?.siteName ?? defaults.siteName).trim() || defaults.siteName,
    legalName: String(input?.legalName ?? defaults.legalName).trim() || defaults.legalName,
    shortName: String(input?.shortName ?? defaults.shortName).trim() || defaults.shortName,
    tagline: String(input?.tagline ?? defaults.tagline).trim(),
    defaultTitle:
      String(input?.defaultTitle ?? defaults.defaultTitle).trim() || defaults.defaultTitle,
    titleTemplate:
      String(input?.titleTemplate ?? defaults.titleTemplate).trim() || defaults.titleTemplate,
    defaultDescription:
      String(input?.defaultDescription ?? defaults.defaultDescription).trim() ||
      defaults.defaultDescription,
    defaultKeywordsText: String(
      input?.defaultKeywordsText ?? defaults.defaultKeywordsText,
    ),
    locale: String(input?.locale ?? defaults.locale).trim() || defaults.locale,
    fallbackSiteUrl:
      String(input?.fallbackSiteUrl ?? defaults.fallbackSiteUrl).trim().replace(/\/$/, "") ||
      defaults.fallbackSiteUrl,
    defaultOgImage:
      String(input?.defaultOgImage ?? defaults.defaultOgImage).trim() || defaults.defaultOgImage,
    logo: String(input?.logo ?? defaults.logo).trim() || defaults.logo,
    contactEmail: String(input?.contactEmail ?? defaults.contactEmail).trim(),
    contactPhone: String(input?.contactPhone ?? defaults.contactPhone).trim(),
    streetAddress: String(input?.streetAddress ?? defaults.streetAddress).trim(),
    addressLocality: String(input?.addressLocality ?? defaults.addressLocality).trim(),
    addressRegion: String(input?.addressRegion ?? defaults.addressRegion).trim(),
    postalCode: String(input?.postalCode ?? defaults.postalCode).trim(),
    addressCountry: String(input?.addressCountry ?? defaults.addressCountry).trim(),
    sameAsText: String(input?.sameAsText ?? defaults.sameAsText),
    robotsIndex: input?.robotsIndex !== false,
    robotsFollow: input?.robotsFollow !== false,
    customMeta: normalizeMeta(input?.customMeta ?? defaults.customMeta),
    routes: normalizeRoutes(input?.routes),
    updatedAt: String(input?.updatedAt ?? defaults.updatedAt),
  };
}

export async function readSeoSettings(): Promise<AdminSeoContent> {
  try {
    const raw = await fs.readFile(SEO_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<AdminSeoContent>;
    return normalizeAdminSeoContent(parsed);
  } catch {
    return defaultAdminSeoContent();
  }
}

export async function writeSeoSettings(
  content: AdminSeoContent,
): Promise<AdminSeoContent> {
  await ensureDataDir();
  const next = normalizeAdminSeoContent({
    ...content,
    updatedAt: new Date().toISOString(),
  });
  await fs.writeFile(SEO_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}
