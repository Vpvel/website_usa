import type { HomeContent } from "@/domain/entities/home-content";
import type { AboutContent } from "@/domain/entities/about-content";
import type { ContactContent } from "@/domain/entities/contact-content";
import type {
  AdminCategory,
  AdminProduct,
  AdminProductDetails,
} from "@/domain/entities/admin";
import type {
  ShopCatalog,
  ShopCategory,
  ShopProduct,
} from "@/domain/entities/shop-product";
import { homeContentLocal } from "@/data/datasources/home-content.local";
import { aboutContentLocal } from "@/data/datasources/about-content.local";
import { contactContentLocal } from "@/data/datasources/contact-content.local";
import { shopCatalogLocal } from "@/data/datasources/shop-catalog.local";
import {
  ADMIN_ABOUT_KEY,
  ADMIN_CATEGORIES_KEY,
  ADMIN_CONTACT_KEY,
  ADMIN_DETAILS_KEY,
  ADMIN_HOME_KEY,
  ADMIN_PRODUCTS_KEY,
  readJson,
} from "@/data/datasources/admin-storage";

function withShopBanners(content: HomeContent): HomeContent {
  if (content.shopBanners?.length) return content;
  return {
    ...content,
    shopBanners: homeContentLocal.shopBanners,
  };
}

export function readDynamicHomeContent(seed: HomeContent = homeContentLocal): HomeContent {
  if (typeof window === "undefined") return withShopBanners(seed);
  const stored = readJson<HomeContent | null>(ADMIN_HOME_KEY, null);
  return withShopBanners(stored ?? seed);
}

export function readDynamicAboutContent(
  seed: AboutContent = aboutContentLocal,
): AboutContent {
  if (typeof window === "undefined") return seed;
  return readJson<AboutContent | null>(ADMIN_ABOUT_KEY, null) ?? seed;
}

export function readDynamicContactContent(
  seed: ContactContent = contactContentLocal,
): ContactContent {
  if (typeof window === "undefined") return seed;
  return readJson<ContactContent | null>(ADMIN_CONTACT_KEY, null) ?? seed;
}

export function buildShopCatalogFromAdmin(
  categories: AdminCategory[],
  products: AdminProduct[],
  details: AdminProductDetails[],
): ShopCatalog {
  const detailsById = new Map(details.map((item) => [item.productId, item]));

  const mapped: ShopCategory[] = categories
    .filter((category) => category.isPublished)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => {
      const categoryProducts: ShopProduct[] = products
        .filter(
          (product) =>
            product.categoryId === category.id && product.isPublished,
        )
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((product) => {
          const detail = detailsById.get(product.id);
          return {
            id: product.id,
            name: product.name,
            shortName: product.shortName,
            summary: product.summary,
            pricePerKg: product.pricePerKg,
            currency: "USD" as const,
            minOrderKg: product.minOrderKg,
            packaging: product.packaging,
            category: category.id,
            imageSrc: product.imageSrc,
            href: product.href,
            sourceUrl: product.sourceUrl ?? "",
            details: detail
              ? {
                  overview: detail.overview,
                  features: detail.features,
                  applications: detail.applications,
                  specifications: detail.specifications,
                }
              : undefined,
          };
        });

      return {
        id: category.id,
        title: category.title,
        description: category.description,
        overview: category.overview,
        features: category.features,
        applications: category.applications,
        specifications: category.specifications,
        products: categoryProducts,
      };
    });

  return { categories: mapped };
}

export function readDynamicShopCatalog(
  seed: ShopCatalog = shopCatalogLocal,
): ShopCatalog {
  if (typeof window === "undefined") return seed;

  const categories = readJson<AdminCategory[] | null>(ADMIN_CATEGORIES_KEY, null);
  const products = readJson<AdminProduct[] | null>(ADMIN_PRODUCTS_KEY, null);
  const details = readJson<AdminProductDetails[] | null>(ADMIN_DETAILS_KEY, null);

  if (!categories?.length || !products?.length) return seed;

  return buildShopCatalogFromAdmin(
    categories,
    products,
    details ?? [],
  );
}

export function readDynamicShopProduct(
  id: string,
  seedProduct: ShopProduct | null,
): ShopProduct | null {
  const catalog = readDynamicShopCatalog();
  return catalog.categories.flatMap((item) => item.products).find((item) => item.id === id)
    ?? seedProduct;
}
