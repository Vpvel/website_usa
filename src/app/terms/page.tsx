import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { termsOfUseLocal } from "@/data/datasources/terms-of-use.local";
import { LegalDocumentPageView } from "@/presentation/components/legal/LegalDocumentPageView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Terms of Use",
  description:
    "Terms of Use for the Angel Starch & Food Inc. USA website and shop.",
  path: "/terms",
});
}

export default async function TermsPage() {
  const site = await getHomeContentUseCase.execute();
  return <LegalDocumentPageView site={site} document={termsOfUseLocal} />;
}
