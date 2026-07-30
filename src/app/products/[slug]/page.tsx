import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getHomeContentUseCase,
  getProductDetailUseCase,
} from "@/di/container";
import { ProductDetailPageView } from "@/presentation/components/product/ProductDetailPageView";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";
import {
  breadcrumbJsonLd,
  productJsonLd,
} from "@/presentation/seo/structured-data";

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

  return await buildManagedPageMetadata({
    title: product.name,
    description: product.lead,
    path: `/products/${product.slug}`,
    keywords: [product.name, product.headline, "Angel Starch products"],
    image: product.heroImageSrc,
    imageAlt: product.heroImageAlt,
    type: "article",
  });
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

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
          productJsonLd({
            name: product.name,
            description: product.lead,
            path: `/products/${product.slug}`,
            image: product.heroImageSrc,
            category: "Food Ingredients",
          }),
        ]}
      />
      <ProductDetailPageView site={site} product={product} />
    </>
  );
}
