import type { Metadata } from "next";
import {
  getAboutContentUseCase,
  getCertificationsUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { AboutPageView } from "@/presentation/components/about/AboutPageView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import { breadcrumbJsonLd } from "@/presentation/seo/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "About Us",
  description:
    "Sree Mangalmoorthi Starch Industries began in 1990; Angel Starch & Food Private Limited was established in 2010 in Erode, Tamil Nadu. Customer-focused innovation across food, textile, paper, pharma, and more.",
  path: "/about",
  keywords: [
    "Angel Starch About",
    "Sree Mangalmoorthi Starch Industries",
    "Erode Tamil Nadu starch manufacturer",
    "APEDA starch exporter",
  ],
});
}

export default async function AboutPage() {
  const [site, about, certifications] = await Promise.all([
    getHomeContentUseCase.execute(),
    getAboutContentUseCase.execute(),
    getCertificationsUseCase.execute(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutPageView
        site={site}
        about={about}
        certifications={certifications}
      />
    </>
  );
}
