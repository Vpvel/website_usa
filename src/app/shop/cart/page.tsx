import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ShopCartView } from "@/presentation/components/shop/ShopCartView";

export const metadata: Metadata = {
  title: "Starch Shop Cart | Angel Starch",
  description:
    "Review bakery modified starch cart items and request a quote for US distribution.",
};

export default async function ShopCartPage() {
  const site = await getHomeContentUseCase.execute();
  return <ShopCartView site={site} />;
}
