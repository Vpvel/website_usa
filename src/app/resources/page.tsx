import type { Metadata } from "next";
import {
  getCertificationsUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { ResourcesPageView } from "@/presentation/components/resources/ResourcesPageView";

export const metadata: Metadata = {
  title: "Resources & Certifications | Angel Starch & Food Inc.",
  description:
    "Review Angel Starch certifications including ISO 9001, BRCGS, FSSAI, FDA, USDA Organic, Halal, Kosher, APEDA, and more.",
};

export default async function ResourcesPage() {
  const [site, certifications] = await Promise.all([
    getHomeContentUseCase.execute(),
    getCertificationsUseCase.execute(),
  ]);

  return <ResourcesPageView site={site} certifications={certifications} />;
}
