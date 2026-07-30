import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { privacyPolicyLocal } from "@/data/datasources/privacy-policy.local";
import { LegalDocumentPageView } from "@/presentation/components/legal/LegalDocumentPageView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Angelstarch USA — how we collect, use, and disclose personal information when you use our store and website.",
  path: "/privacy",
});
}

export default async function PrivacyPage() {
  const site = await getHomeContentUseCase.execute();
  return <LegalDocumentPageView site={site} document={privacyPolicyLocal} />;
}
