import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { privacyPolicyLocal } from "@/data/datasources/privacy-policy.local";
import { LegalDocumentPageView } from "@/presentation/components/legal/LegalDocumentPageView";

export const metadata: Metadata = {
  title: "Privacy Policy | Angel Starch & Food Inc.",
  description:
    "Privacy Policy for Angelstarch USA — how we collect, use, and disclose personal information when you use our store and website.",
};

export default async function PrivacyPage() {
  const site = await getHomeContentUseCase.execute();
  return <LegalDocumentPageView site={site} document={privacyPolicyLocal} />;
}
