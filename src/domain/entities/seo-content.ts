export type SeoMetaPair = {
  key: string;
  value: string;
};

export type SeoRouteOverride = {
  id: string;
  route: string;
  enabled: boolean;
  title: string;
  description: string;
  keywordsText: string;
  ogImage: string;
  ogImageAlt: string;
  canonicalPath: string;
  noIndex: boolean;
  customMeta: SeoMetaPair[];
};

export type AdminSeoContent = {
  siteName: string;
  legalName: string;
  shortName: string;
  tagline: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywordsText: string;
  locale: string;
  fallbackSiteUrl: string;
  defaultOgImage: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  sameAsText: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  /** Global custom meta / AI SEO keys (name → content). */
  customMeta: SeoMetaPair[];
  /** Per-route overrides. */
  routes: SeoRouteOverride[];
  updatedAt: string;
};

export function keywordsFromText(value: string): string[] {
  return value
    .split(/[\n,]/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function textFromKeywords(values: string[]): string {
  return values.join(", ");
}

export function sameAsFromText(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
