import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ShopCartView } from "@/presentation/components/shop/ShopCartView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Cart",
  description: "Review starch cart items and continue to checkout.",
  path: "/shop/cart",
  noIndex: true,
});
}

export default async function ShopCartPage() {
  const site = await getHomeContentUseCase.execute();
  return <ShopCartView site={site} />;
}
