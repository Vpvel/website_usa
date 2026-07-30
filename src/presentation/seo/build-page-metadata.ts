import type { Metadata } from "next";
import { siteSeo } from "@/data/datasources/site-seo.local";
import { absoluteAssetUrl, absoluteUrl } from "@/presentation/seo/site-url";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = siteSeo.defaultOgImage,
  imageAlt = siteSeo.siteName,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteAssetUrl(image);
  const mergedKeywords = Array.from(
    new Set([...siteSeo.defaultKeywords, ...keywords]),
  );
  const absoluteTitle = /angel starch/i.test(title)
    ? title
    : `${title} | ${siteSeo.siteName}`;

  return {
    title: {
      absolute: absoluteTitle,
    },
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: absoluteTitle,
      description,
      url,
      siteName: siteSeo.siteName,
      locale: siteSeo.locale,
      type,
      images: [
        {
          url: ogImage,
          alt: imageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
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
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export const noIndexMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
