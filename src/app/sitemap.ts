import type { MetadataRoute } from "next";
import { getShopCatalogUseCase } from "@/di/container";
import { applicationDetailsLocal } from "@/data/datasources/application-details.local";
import { productDetailsLocal } from "@/data/datasources/product-details.local";
import { absoluteAssetUrl, absoluteUrl } from "@/presentation/seo/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const catalog = await getShopCatalogUseCase.execute();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/applications", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/shop", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((item) => ({
    url: absoluteUrl(item.path),
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const applicationRoutes: MetadataRoute.Sitemap = applicationDetailsLocal.map(
    (item) => ({
      url: absoluteUrl(`/applications/${item.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteAssetUrl(item.heroImageSrc)],
    }),
  );

  const productStoryRoutes: MetadataRoute.Sitemap = productDetailsLocal.map(
    (item) => ({
      url: absoluteUrl(`/products/${item.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      images: [absoluteAssetUrl(item.heroImageSrc)],
    }),
  );

  const shopProductRoutes: MetadataRoute.Sitemap = catalog.categories.flatMap(
    (category) =>
      category.products.map((product) => ({
        url: absoluteUrl(product.href),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
        images: [absoluteAssetUrl(product.imageSrc)],
      })),
  );

  return [
    ...staticRoutes,
    ...applicationRoutes,
    ...productStoryRoutes,
    ...shopProductRoutes,
  ];
}
