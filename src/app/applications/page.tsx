import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ApplicationsIndexView } from "@/presentation/components/application/ApplicationsIndexView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import { breadcrumbJsonLd } from "@/presentation/seo/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Applications",
  description:
    "Bakery, dairy, sauces & dressings, meat & poultry, snacks, and beverage starch applications from Angel Starch.",
  path: "/applications",
  keywords: [
    "starch applications",
    "bakery starch",
    "dairy starch",
    "sauce starch",
  ],
});
}

export default async function ApplicationsIndexPage() {
  const site = await getHomeContentUseCase.execute();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Applications", path: "/applications" },
        ])}
      />
      <ApplicationsIndexView site={site} />
    </>
  );
}
