import type { Metadata } from "next";
import {
  getCertificationsUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { HomePageView } from "@/presentation/components/home/HomePageView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import {
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/presentation/seo/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Clean-Label Starch & Food Ingredients for US Brands",
  description:
    "Angel Starch & Food Inc. supplies clean-label native starch, modified starch, organic cassava flour, and sweeteners for US bakery, dairy, sauces, snacks, and beverage brands.",
  path: "/",
  keywords: [
    "US starch supplier",
    "clean label ingredients",
    "food starch manufacturer",
  ],
});
}

export default async function HomePage() {
  const [content, certifications] = await Promise.all([
    getHomeContentUseCase.execute(),
    getCertificationsUseCase.execute(),
  ]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          faqJsonLd([
            {
              question: "What products does Angel Starch supply in the USA?",
              answer:
                "Native starch, modified starch, organic cassava flour, clean-label starch systems, and sweeteners for food manufacturers.",
            },
            {
              question: "Can I request samples or a formulation consult?",
              answer:
                "Yes. Use the Contact page or Shop starch flow to request samples, quotes, and application support.",
            },
            {
              question: "Where is the USA office?",
              answer:
                "Angel Starch & Food Inc. lists a USA office in Chicago, IL for local commercial support.",
            },
          ]),
        ]}
      />
      <HomePageView content={content} certifications={certifications} />
    </>
  );
}
