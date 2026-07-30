import { siteSeo } from "@/data/datasources/site-seo.local";
import {
  textFromKeywords,
  type AdminSeoContent,
  type SeoRouteOverride,
} from "@/domain/entities/seo-content";

export const DEFAULT_SEO_ROUTES: Array<
  Pick<SeoRouteOverride, "route" | "title" | "description">
> = [
  {
    route: "/",
    title: "Clean-Label Starch & Food Ingredients for US Brands",
    description:
      "Angel Starch & Food Inc. supplies clean-label native starch, modified starch, organic cassava flour, and sweeteners for US bakery, dairy, sauces, snacks, and beverage brands.",
  },
  {
    route: "/about",
    title: "About Us",
    description:
      "Sree Mangalmoorthi Starch Industries began in 1990; Angel Starch & Food Private Limited was established in 2010 in Erode, Tamil Nadu.",
  },
  {
    route: "/contact",
    title: "Contact Us",
    description:
      "Contact Angel Starch & Food Inc. USA for starch sample requests, formulation support, and supply partnerships.",
  },
  {
    route: "/products",
    title: "Products",
    description:
      "Browse Angel Starch native starch, organic cassava flour, sweeteners, clean-label starch, and modified starch products.",
  },
  {
    route: "/shop",
    title: "Starch Shop | Potato, Tapioca & Food Ingredients",
    description:
      "Shop Angel Starch potato starch, tapioca starch, food additives, and food ingredients.",
  },
  {
    route: "/applications",
    title: "Applications",
    description:
      "Bakery, dairy, sauces & dressings, meat & poultry, snacks, and beverage starch applications from Angel Starch.",
  },
  {
    route: "/resources",
    title: "Resources & Certifications",
    description:
      "Review Angel Starch certifications including ISO 9001, BRCGS, FSSAI, FDA, USDA Organic, Halal, Kosher, APEDA, and more.",
  },
  {
    route: "/privacy",
    title: "Privacy Policy",
    description:
      "Privacy Policy for Angelstarch USA — how we collect, use, and disclose personal information.",
  },
  {
    route: "/terms",
    title: "Terms of Use",
    description: "Terms of Use for the Angel Starch & Food Inc. USA website and shop.",
  },
];

export function defaultAdminSeoContent(): AdminSeoContent {
  return {
    siteName: siteSeo.siteName,
    legalName: siteSeo.legalName,
    shortName: siteSeo.shortName,
    tagline: siteSeo.tagline,
    defaultTitle: siteSeo.defaultTitle,
    titleTemplate: siteSeo.titleTemplate,
    defaultDescription: siteSeo.defaultDescription,
    defaultKeywordsText: textFromKeywords([...siteSeo.defaultKeywords]),
    locale: siteSeo.locale,
    fallbackSiteUrl: siteSeo.fallbackSiteUrl,
    defaultOgImage: siteSeo.defaultOgImage,
    logo: siteSeo.logo,
    contactEmail: siteSeo.contactEmail,
    contactPhone: siteSeo.contactPhone,
    streetAddress: siteSeo.address.streetAddress,
    addressLocality: siteSeo.address.addressLocality,
    addressRegion: siteSeo.address.addressRegion,
    postalCode: siteSeo.address.postalCode,
    addressCountry: siteSeo.address.addressCountry,
    sameAsText: siteSeo.sameAs.join("\n"),
    robotsIndex: true,
    robotsFollow: true,
    customMeta: [
      { key: "ai-content-declaration", value: "human-authored-business-website" },
    ],
    routes: DEFAULT_SEO_ROUTES.map((item) => ({
      id: `seo-route${item.route === "/" ? "-home" : item.route.replaceAll("/", "-")}`,
      route: item.route,
      enabled: true,
      title: item.title,
      description: item.description,
      keywordsText: "",
      ogImage: "",
      ogImageAlt: "",
      canonicalPath: item.route,
      noIndex: false,
      customMeta: [],
    })),
    updatedAt: new Date().toISOString(),
  };
}
