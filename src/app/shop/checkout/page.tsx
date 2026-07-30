import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ShopCheckoutView } from "@/presentation/components/shop/ShopCheckoutView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Checkout",
  description: "Complete your Angel Starch order request with shipping details.",
  path: "/shop/checkout",
  noIndex: true,
});
}

export default async function ShopCheckoutPage() {
  const site = await getHomeContentUseCase.execute();
  return <ShopCheckoutView site={site} />;
}
