import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getHomeContentUseCase,
  getShopCatalogUseCase,
  getShopProductUseCase,
} from "@/di/container";
import { ShopProductDetailView } from "@/presentation/components/shop/ShopProductDetailView";

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

  return {
    title: `${product.name} | Angel Starch Shop`,
    description: product.summary,
  };
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
    <ShopProductDetailView
      site={site}
      product={product}
      categoryTitle={category?.title ?? "Products"}
      related={related}
    />
  );
}
