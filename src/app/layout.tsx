import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Fraunces,
  Source_Sans_3,
} from "next/font/google";
import { AppProviders } from "@/presentation/providers/AppProviders";
import { JsonLd } from "@/presentation/seo/JsonLd";
import {
  buildManagedPageMetadata,
  getManagedOrganizationFields,
} from "@/presentation/seo/resolve-managed-seo";
import { absoluteAssetUrl, getSiteUrl } from "@/presentation/seo/site-url";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const managed = await buildManagedPageMetadata({ path: "/" });
  const org = await getManagedOrganizationFields();
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(org.fallbackSiteUrl || siteUrl),
    ...managed,
    applicationName: org.siteName,
    authors: [{ name: org.siteName }],
    creator: org.siteName,
    publisher: org.siteName,
    category: "Food Ingredients",
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
      date: false,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const org = await getManagedOrganizationFields();
  const siteUrl = org.fallbackSiteUrl || getSiteUrl();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: org.siteName,
    legalName: org.legalName,
    url: siteUrl,
    logo: absoluteAssetUrl(org.logo),
    image: absoluteAssetUrl(org.defaultOgImage),
    description: org.description,
    email: org.contactEmail,
    telephone: org.contactPhone,
    address: {
      "@type": "PostalAddress",
      ...org.address,
    },
    sameAs: org.sameAs,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: org.siteName,
    url: siteUrl,
    description: org.description,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${cormorant.variable} ${body.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col antialiased"
        suppressHydrationWarning
      >
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
