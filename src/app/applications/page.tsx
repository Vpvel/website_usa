import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ApplicationsIndexView } from "@/presentation/components/application/ApplicationsIndexView";

export const metadata: Metadata = {
  title: "Applications | Angel Starch & Food Inc.",
  description:
    "Bakery, dairy, sauces & dressings, meat & poultry, snacks, and beverage applications.",
};

export default async function ApplicationsIndexPage() {
  const site = await getHomeContentUseCase.execute();
  return <ApplicationsIndexView site={site} />;
}
