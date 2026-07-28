import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ShopWishlistView } from "@/presentation/components/shop/ShopWishlistView";

export const metadata: Metadata = {
  title: "Wishlist | Angel Starch Shop",
  description: "Saved starch products wishlist stored locally in your browser.",
};

export default async function ShopWishlistPage() {
  const site = await getHomeContentUseCase.execute();
  return <ShopWishlistView site={site} />;
}
