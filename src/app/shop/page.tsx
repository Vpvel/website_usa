import type { Metadata } from "next";
import {
  getHomeContentUseCase,
  getShopCatalogUseCase,
} from "@/di/container";
import { ShopPageView } from "@/presentation/components/shop/ShopPageView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from "@/presentation/seo/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Starch Shop | Potato, Tapioca & Food Ingredients",
  description:
    "Shop Angel Starch potato starch, tapioca starch, food additives, and food ingredients. Add to cart and request a US supply quote.",
  path: "/shop",
  keywords: [
    "potato starch",
    "tapioca starch",
    "food additives",
    "food ingredients",
    "Angel Starch shop",
    "cassava flour",
  ],
});
}

export default async function ShopPage() {
  const [site, catalog] = await Promise.all([
    getHomeContentUseCase.execute(),
    getShopCatalogUseCase.execute(),
  ]);

  const items = catalog.categories.flatMap((category) =>
    category.products.map((product) => ({
      name: product.name,
      path: product.href,
    })),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
          collectionPageJsonLd({
            name: "Angel Starch Shop",
            description:
              "Shop native starch, organic products, sweeteners, clean-label starch, and modified starch.",
            path: "/shop",
            items,
          }),
        ]}
      />
      <ShopPageView site={site} catalog={catalog} />
    </>
  );
}
