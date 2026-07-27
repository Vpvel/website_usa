import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ProductsIndexView } from "@/presentation/components/product/ProductsIndexView";

export const metadata: Metadata = {
  title: "Products | Angel Starch & Food Inc.",
  description:
    "Explore native modified starches, custom formulation, and US supply solutions.",
};

export default async function ProductsIndexPage() {
  const site = await getHomeContentUseCase.execute();
  return <ProductsIndexView site={site} />;
}
