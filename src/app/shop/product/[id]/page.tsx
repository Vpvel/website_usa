import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getHomeContentUseCase,
  getShopCatalogUseCase,
  getShopProductUseCase,
} from "@/di/container";
import { ShopProductDetailView } from "@/presentation/components/shop/ShopProductDetailView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import {
  breadcrumbJsonLd,
  productJsonLd,
} from "@/presentation/seo/structured-data";

type ShopProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ShopProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getShopProductUseCase.execute(id);

  if (!product) {
    return { title: "Product not found" };
  }

  return await buildManagedPageMetadata({
    title: `${product.name} | Angel Starch Shop`,
    description: product.summary,
    path: product.href,
    keywords: [
      product.name,
      product.shortName,
      product.category,
      "buy starch",
      "food starch shop",
    ],
    image: product.imageSrc,
    imageAlt: product.name,
  });
}

export default async function ShopProductDetailPage({
  params,
}: ShopProductPageProps) {
  const { id } = await params;
  const [site, product, catalog] = await Promise.all([
    getHomeContentUseCase.execute(),
    getShopProductUseCase.execute(id),
    getShopCatalogUseCase.execute(),
  ]);

  if (!product) {
    notFound();
  }

  const category = catalog.categories.find((item) => item.id === product.category);
  const related =
    category?.products.filter((item) => item.id !== product.id).slice(0, 4) ??
    [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            {
              name: category?.title ?? "Products",
              path: `/products?category=${product.category}`,
            },
            { name: product.name, path: product.href },
          ]),
          productJsonLd({
            name: product.name,
            description: product.summary,
            path: product.href,
            image: product.imageSrc,
            sku: product.id,
            category: category?.title ?? product.category,
            price: product.pricePerKg,
            currency: product.currency,
            availability: "InStock",
          }),
        ]}
      />
      <ShopProductDetailView
        site={site}
        product={product}
        categoryTitle={category?.title ?? "Products"}
        related={related}
        catalog={catalog}
      />
    </>
  );
}
