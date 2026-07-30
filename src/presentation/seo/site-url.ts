import { siteSeo } from "@/data/datasources/site-seo.local";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return siteSeo.fallbackSiteUrl;
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteAssetUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return absoluteUrl(path);
}
