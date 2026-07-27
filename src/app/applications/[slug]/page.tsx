import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getApplicationDetailUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { ApplicationDetailPageView } from "@/presentation/components/application/ApplicationDetailPageView";

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
    "Angel Starch",
    "food ingredients",
    "modified starch",
    "clean label starch",
    ...ingredientKeywords,
  ];

  const title = `${application.title} Ingredients & Formulation Solutions | Angel Starch`;
  const description = `${application.pageHeadline} Explore related ingredients in ${application.title.toLowerCase()} from Angel Starch & Food Inc.`;
  const canonical = `/applications/${application.slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: [
        {
          url: application.heroImageSrc,
          alt: application.heroImageAlt,
        },
      ],
      siteName: "Angel Starch & Food Inc.",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [application.heroImageSrc],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
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
