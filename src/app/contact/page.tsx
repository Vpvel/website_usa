import type { Metadata } from "next";
import {
  getContactContentUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { ContactPageView } from "@/presentation/components/contact/ContactPageView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import { breadcrumbJsonLd } from "@/presentation/seo/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Contact Us",
  description:
    "Contact Angel Starch & Food Inc. USA for starch sample requests, formulation support, and supply partnerships. Chicago, IL office.",
  path: "/contact",
  keywords: [
    "Angel Starch contact",
    "USA starch sample request",
    "Chicago starch supplier",
    "modified starch USA",
  ],
});
}

export default async function ContactPage() {
  const [site, contact] = await Promise.all([
    getHomeContentUseCase.execute(),
    getContactContentUseCase.execute(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactPageView site={site} contact={contact} />
    </>
  );
}
