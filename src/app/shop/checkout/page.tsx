import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { ShopCheckoutView } from "@/presentation/components/shop/ShopCheckoutView";

export const metadata: Metadata = {
  title: "Checkout | Angel Starch Shop",
  description: "Enter shipping address and place a local starch order request.",
};

export default async function ShopCheckoutPage() {
  const site = await getHomeContentUseCase.execute();
  return <ShopCheckoutView site={site} />;
}
