import type { Metadata } from "next";
import {
  getHomeContentUseCase,
  getShopCatalogUseCase,
} from "@/di/container";
import { ShopPageView } from "@/presentation/components/shop/ShopPageView";

export const metadata: Metadata = {
  title: "Starch Shop | Potato, Tapioca & Food Ingredients | Angel Starch",
  description:
    "Shop Angel Starch potato starch, tapioca starch, food additives, and food ingredients. Add to cart and request a US supply quote.",
  keywords: [
    "potato starch",
    "tapioca starch",
    "food additives",
    "food ingredients",
    "Angel Starch shop",
    "cassava flour",
  ],
};

export default async function ShopPage() {
  const [site, catalog] = await Promise.all([
    getHomeContentUseCase.execute(),
    getShopCatalogUseCase.execute(),
  ]);

  return <ShopPageView site={site} catalog={catalog} />;
}
