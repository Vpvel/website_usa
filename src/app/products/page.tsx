import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getHomeContentUseCase,
  getShopCatalogUseCase,
} from "@/di/container";
import { ProductsIndexView } from "@/presentation/components/product/ProductsIndexView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from "@/presentation/seo/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Products",
  description:
    "Browse Angel Starch native starch, organic cassava flour, sweeteners, clean-label starch, and modified starch products.",
  path: "/products",
  keywords: [
    "native starch products",
    "modified starch catalog",
    "organic cassava flour",
    "clean label starch products",
  ],
});
}

export default async function ProductsIndexPage() {
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
            { name: "Products", path: "/products" },
          ]),
          collectionPageJsonLd({
            name: "Angel Starch Products",
            description:
              "Native starch, organic products, sweeteners, clean-label starch, and modified starch.",
            path: "/products",
            items,
          }),
        ]}
      />
      <Suspense fallback={null}>
        <ProductsIndexView site={site} catalog={catalog} />
      </Suspense>
    </>
  );
}
