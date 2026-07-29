import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getHomeContentUseCase,
  getShopCatalogUseCase,
} from "@/di/container";
import { ProductsIndexView } from "@/presentation/components/product/ProductsIndexView";

export const metadata: Metadata = {
  title: "Products | Angel Starch & Food Inc.",
  description:
    "Browse Angel Starch native starch, organic cassava flour, sweeteners, clean-label starch, and modified starch products.",
};

export default async function ProductsIndexPage() {
  const [site, catalog] = await Promise.all([
    getHomeContentUseCase.execute(),
    getShopCatalogUseCase.execute(),
  ]);

  return (
    <Suspense fallback={null}>
      <ProductsIndexView site={site} catalog={catalog} />
    </Suspense>
  );
}
