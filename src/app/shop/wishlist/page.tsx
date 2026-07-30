import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ShopWishlistView } from "@/presentation/components/shop/ShopWishlistView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Wishlist",
  description: "Saved Angel Starch products in your local wishlist.",
  path: "/shop/wishlist",
  noIndex: true,
});
}

export default async function ShopWishlistPage() {
  const site = await getHomeContentUseCase.execute();
  return <ShopWishlistView site={site} />;
}
