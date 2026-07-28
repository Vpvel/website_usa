import type { Metadata } from "next";
import {
  getAboutContentUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { AboutPageView } from "@/presentation/components/about/AboutPageView";

export const metadata: Metadata = {
  title: "About Us | Angel Starch & Food Inc.",
  description:
    "Sree Mangalmoorthi Starch Industries began in 1990; Angel Starch & Food Private Limited was established in 2010 in Erode, Tamil Nadu. Customer Focussed Innovation across food, textile, paper, pharma, and more.",
  keywords: [
    "Angel Starch About",
    "Sree Mangalmoorthi Starch Industries",
    "Erode Tamil Nadu starch manufacturer",
    "V. P. S. Radhakrishnan",
    "APEDA starch exporter",
  ],
};

export default async function AboutPage() {
  const [site, about] = await Promise.all([
    getHomeContentUseCase.execute(),
    getAboutContentUseCase.execute(),
  ]);

  return <AboutPageView site={site} about={about} />;
}
