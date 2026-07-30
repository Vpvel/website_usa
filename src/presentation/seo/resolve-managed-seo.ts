import type { Metadata } from "next";
import { readSeoSettings } from "@/data/datasources/seo-settings.server";
import {
  keywordsFromText,
  sameAsFromText,
  type AdminSeoContent,
  type SeoMetaPair,
} from "@/domain/entities/seo-content";
import { getSiteUrl } from "@/presentation/seo/site-url";

export type ManagedPageSeoInput = {
  path: string;
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

function normalizePath(path: string) {
  if (!path || path === "") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) {
    return withSlash.slice(0, -1);
  }
  return withSlash;
}

function metaPairsToOther(pairs: SeoMetaPair[]): Record<string, string> {
  const other: Record<string, string> = {};
  for (const pair of pairs) {
    if (!pair.key) continue;
    other[pair.key] = pair.value;
  }
  return other;
}

export function findRouteOverride(seo: AdminSeoContent, path: string) {
  const target = normalizePath(path);
  return (
    seo.routes.find(
      (route) => route.enabled && normalizePath(route.route) === target,
    ) ?? null
  );
}

export async function getManagedSeoSettings() {
  return readSeoSettings();
}

export async function buildManagedPageMetadata(
  input: ManagedPageSeoInput,
): Promise<Metadata> {
  const seo = await readSeoSettings();
  const override = findRouteOverride(seo, input.path);

  const title =
    override?.title?.trim() ||
    input.title?.trim() ||
    seo.defaultTitle;
  const description =
    override?.description?.trim() ||
    input.description?.trim() ||
    seo.defaultDescription;
  const keywords = Array.from(
    new Set([
      ...keywordsFromText(seo.defaultKeywordsText),
      ...(input.keywords ?? []),
      ...keywordsFromText(override?.keywordsText ?? ""),
    ]),
  );
  const image =
    override?.ogImage?.trim() ||
    input.image?.trim() ||
    seo.defaultOgImage;
  const imageAlt =
    override?.ogImageAlt?.trim() ||
    input.imageAlt?.trim() ||
    seo.siteName;
  const canonicalPath =
    override?.canonicalPath?.trim() ||
    normalizePath(input.path);
  const noIndex =
    Boolean(input.noIndex) ||
    Boolean(override?.noIndex) ||
    !seo.robotsIndex;
  const absoluteTitle = /angel starch/i.test(title)
    ? title
    : `${title} | ${seo.siteName}`;
  const base = (seo.fallbackSiteUrl || getSiteUrl()).replace(/\/$/, "");
  const url =
    canonicalPath === "/"
      ? base
      : `${base}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
  const ogImage = image.startsWith("http")
    ? image
    : `${base}${image.startsWith("/") ? image : `/${image}`}`;
  const other = {
    ...metaPairsToOther(seo.customMeta),
    ...metaPairsToOther(override?.customMeta ?? []),
  };

  return {
    title: {
      absolute: absoluteTitle,
    },
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: absoluteTitle,
      description,
      url,
      siteName: seo.siteName,
      locale: seo.locale,
      type: input.type ?? "website",
      images: [
        {
          url: ogImage,
          alt: imageAlt,
        },
      ],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: seo.robotsIndex,
          follow: seo.robotsFollow,
          googleBot: {
            index: seo.robotsIndex,
            follow: seo.robotsFollow,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    ...(Object.keys(other).length > 0 ? { other } : {}),
  };
}

export async function getManagedOrganizationFields() {
  const seo = await readSeoSettings();
  return {
    siteName: seo.siteName,
    legalName: seo.legalName,
    description: seo.defaultDescription,
    logo: seo.logo,
    defaultOgImage: seo.defaultOgImage,
    contactEmail: seo.contactEmail,
    contactPhone: seo.contactPhone,
    sameAs: sameAsFromText(seo.sameAsText),
    address: {
      streetAddress: seo.streetAddress,
      addressLocality: seo.addressLocality,
      addressRegion: seo.addressRegion,
      postalCode: seo.postalCode,
      addressCountry: seo.addressCountry,
    },
    fallbackSiteUrl: seo.fallbackSiteUrl,
  };
}
