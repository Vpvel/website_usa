import type { Metadata } from "next";
import {
  getCertificationsUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { ResourcesPageView } from "@/presentation/components/resources/ResourcesPageView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import { breadcrumbJsonLd } from "@/presentation/seo/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Resources & Certifications",
  description:
    "Review Angel Starch certifications including ISO 9001, BRCGS, FSSAI, FDA, USDA Organic, Halal, Kosher, APEDA, and more.",
  path: "/resources",
  keywords: [
    "starch certifications",
    "ISO 9001",
    "BRCGS",
    "USDA Organic starch",
    "Halal Kosher starch",
  ],
});
}

export default async function ResourcesPage() {
  const [site, certifications] = await Promise.all([
    getHomeContentUseCase.execute(),
    getCertificationsUseCase.execute(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />
      <ResourcesPageView site={site} certifications={certifications} />
    </>
  );
}
