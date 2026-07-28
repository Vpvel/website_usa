import type { Metadata } from "next";
import {
  getHomeContentUseCase,
  getShopCatalogUseCase,
} from "@/di/container";
import { ShopPageView } from "@/presentation/components/shop/ShopPageView";

export const metadata: Metadata = {
  title: "Starch Shop | Bakery Modified Starch | Angel Starch",
  description:
    "Shop bakery modified starch products including StaThick, FlaMas, FruJix, corn starch 7M, and instant jam mixes. Add to cart and request a US supply quote.",
  keywords: [
    "bakery modified starch",
    "StaThick PS",
    "FlaMas MS-CWS",
    "FruJix",
    "corn starch 7M",
    "Angel Starch shop",
  ],
};

export default async function ShopPage() {
  const [site, products] = await Promise.all([
    getHomeContentUseCase.execute(),
    getShopCatalogUseCase.execute(),
  ]);

  return <ShopPageView site={site} products={products} />;
}
