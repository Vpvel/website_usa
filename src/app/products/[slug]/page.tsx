import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getHomeContentUseCase,
  getProductDetailUseCase,
} from "@/di/container";
import { ProductDetailPageView } from "@/presentation/components/product/ProductDetailPageView";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetailUseCase.execute(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | Angel Starch & Food Inc.`,
    description: product.lead,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [site, product] = await Promise.all([
    getHomeContentUseCase.execute(),
    getProductDetailUseCase.execute(slug),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageView site={site} product={product} />;
}
