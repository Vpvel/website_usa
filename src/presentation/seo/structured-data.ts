import { siteSeo } from "@/data/datasources/site-seo.local";
import { absoluteAssetUrl, absoluteUrl, getSiteUrl } from "@/presentation/seo/site-url";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: siteSeo.siteName,
    legalName: siteSeo.legalName,
    url: getSiteUrl(),
    logo: absoluteAssetUrl(siteSeo.logo),
    image: absoluteAssetUrl(siteSeo.defaultOgImage),
    description: siteSeo.defaultDescription,
    email: siteSeo.contactEmail,
    telephone: siteSeo.contactPhone,
    address: {
      "@type": "PostalAddress",
      ...siteSeo.address,
    },
    sameAs: [...siteSeo.sameAs],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: siteSeo.siteName,
    url: getSiteUrl(),
    description: siteSeo.defaultDescription,
    publisher: {
      "@id": `${getSiteUrl()}/#organization`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image: string;
  sku?: string;
  category?: string;
  price?: number;
  currency?: string;
  availability?: "InStock" | "PreOrder" | "OutOfStock";
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    sku: input.sku ?? input.path.split("/").pop(),
    category: input.category,
    image: [absoluteAssetUrl(input.image)],
    brand: {
      "@type": "Brand",
      name: siteSeo.siteName,
    },
    url: absoluteUrl(input.path),
    ...(typeof input.price === "number"
      ? {
          offers: {
            "@type": "Offer",
            url: absoluteUrl(input.path),
            priceCurrency: input.currency ?? "USD",
            price: input.price.toFixed(2),
            availability: `https://schema.org/${input.availability ?? "InStock"}`,
            seller: {
              "@id": `${getSiteUrl()}/#organization`,
            },
          },
        }
      : {}),
  };
}

export function collectionPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@id": `${getSiteUrl()}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function faqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
