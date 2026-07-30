import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getApplicationDetailUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { ApplicationDetailPageView } from "@/presentation/components/application/ApplicationDetailPageView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

type ApplicationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ApplicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const application = await getApplicationDetailUseCase.execute(slug);
  if (!application) return { title: "Application not found" };

  const ingredientKeywords = application.ingredientCards.map((item) => item.name);
  const keywords = [
    application.title,
    `${application.title} starch`,
    `${application.title} ingredients`,
    `Related ingredients in ${application.title.toLowerCase()}`,
    ...ingredientKeywords,
  ];

  return await buildManagedPageMetadata({
    title: `${application.title} Ingredients & Formulation Solutions`,
    description: `${application.pageHeadline} Explore related ingredients in ${application.title.toLowerCase()} from Angel Starch & Food Inc.`,
    path: `/applications/${application.slug}`,
    keywords,
    image: application.heroImageSrc,
    imageAlt: application.heroImageAlt,
    type: "article",
  });
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationPageProps) {
  const { slug } = await params;
  const [site, application] = await Promise.all([
    getHomeContentUseCase.execute(),
    getApplicationDetailUseCase.execute(slug),
  ]);

  if (!application) notFound();

  return <ApplicationDetailPageView site={site} application={application} />;
}
