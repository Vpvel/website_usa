import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { termsOfUseLocal } from "@/data/datasources/terms-of-use.local";
import { LegalDocumentPageView } from "@/presentation/components/legal/LegalDocumentPageView";

export const metadata: Metadata = {
  title: "Terms of Use | Angel Starch & Food Inc.",
  description:
    "Terms of Use for the Angel Starch & Food Inc. USA website and shop.",
};

export default async function TermsPage() {
  const site = await getHomeContentUseCase.execute();
  return <LegalDocumentPageView site={site} document={termsOfUseLocal} />;
}
