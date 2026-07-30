export const siteSeo = {
  siteName: "Angel Starch & Food Inc.",
  legalName: "Angel Starch & Food Inc.",
  shortName: "Angel Starch",
  tagline: "Clean-label texture and stability solutions for US food brands",
  defaultTitle: "Angel Starch & Food Inc. | Clean-Label Ingredients for US Brands",
  titleTemplate: "%s | Angel Starch & Food Inc.",
  defaultDescription:
    "Clean-label native starch, modified starch, organic cassava flour, and sweeteners that help US food brands launch better products—faster.",
  defaultKeywords: [
    "Angel Starch",
    "clean label starch",
    "native starch",
    "modified starch",
    "tapioca starch",
    "potato starch",
    "cassava flour",
    "food ingredients USA",
    "starch manufacturer",
    "US starch supplier",
  ],
  locale: "en_US",
  /** Prefer NEXT_PUBLIC_SITE_URL in production (e.g. https://www.angelstarch.com). */
  fallbackSiteUrl: "https://www.angelstarch.com",
  defaultOgImage: "/images/banner/01-banner-native-modified-starch.webp",
  logo: "/images/logo/angel-starch-logo.webp",
  contactEmail: "usa@angelstarch.com",
  contactPhone: "+1-312-555-0148",
  address: {
    streetAddress: "1250 Commerce Dr, Suite 400",
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60601",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.indiamart.com/angelfoodstarch/",
  ],
} as const;

export type SiteSeoConfig = typeof siteSeo;
