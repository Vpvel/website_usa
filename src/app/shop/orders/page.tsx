import type { Metadata } from "next";
import { Suspense } from "react";
import { getHomeContentUseCase } from "@/di/container";
import { ShopOrdersView } from "@/presentation/components/shop/ShopOrdersView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Order History",
  description: "View local starch order request history saved in your browser.",
  path: "/shop/orders",
  noIndex: true,
});
}

export default async function ShopOrdersPage() {
  const site = await getHomeContentUseCase.execute();
  return (
    <Suspense fallback={<main className="shop-cart"><p>Loading orders…</p></main>}>
      <ShopOrdersView site={site} />
    </Suspense>
  );
}
