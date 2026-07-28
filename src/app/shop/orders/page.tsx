import type { Metadata } from "next";
import { Suspense } from "react";
import { getHomeContentUseCase } from "@/di/container";
import { ShopOrdersView } from "@/presentation/components/shop/ShopOrdersView";

export const metadata: Metadata = {
  title: "Order History | Angel Starch Shop",
  description: "View local starch order request history saved in your browser.",
};

export default async function ShopOrdersPage() {
  const site = await getHomeContentUseCase.execute();
  return (
    <Suspense fallback={<main className="shop-cart"><p>Loading orders…</p></main>}>
      <ShopOrdersView site={site} />
    </Suspense>
  );
}
