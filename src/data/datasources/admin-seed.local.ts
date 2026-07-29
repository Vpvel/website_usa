import { shopCatalogLocal } from "@/data/datasources/shop-catalog.local";
import { homeContentLocal } from "@/data/datasources/home-content.local";
import { aboutContentLocal } from "@/data/datasources/about-content.local";
import { contactContentLocal } from "@/data/datasources/contact-content.local";
import type {
  AdminAboutContent,
  AdminCategory,
  AdminContactContent,
  AdminHomeContent,
  AdminProduct,
  AdminProductDetails,
  AdminStoredUser,
} from "@/domain/entities/admin";
import { hashPassword, nowIso } from "@/data/datasources/admin-storage";

const SUPER_EMAIL = "superadmin@angelstarch.com";
const SUPER_PASSWORD = "SuperAdmin@123";

export function buildSeedSuperAdmin(): AdminStoredUser {
  const now = nowIso();
  return {
    id: "super-admin-seed",
    name: "Super Admin",
    email: SUPER_EMAIL,
    company: "Angel Starch & Food Inc.",
    phone: "",
    role: "super_admin",
    isActive: true,
    passwordHash: hashPassword(SUPER_PASSWORD),
    createdAt: now,
    updatedAt: now,
  };
}

export function buildSeedCategories(): AdminCategory[] {
  const now = nowIso();
  return shopCatalogLocal.categories.map((category, index) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    overview: category.overview,
    features: category.features,
    applications: category.applications,
    specifications: category.specifications,
    sortOrder: index,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  }));
}

export function buildSeedProducts(): AdminProduct[] {
  const now = nowIso();
  return shopCatalogLocal.categories.flatMap((category, categoryIndex) =>
    category.products.map((product, productIndex) => ({
      id: product.id,
      name: product.name,
      shortName: product.shortName,
      summary: product.summary,
      pricePerKg: product.pricePerKg,
      currency: "USD" as const,
      minOrderKg: product.minOrderKg,
      packaging: product.packaging,
      categoryId: product.category,
      imageSrc: product.imageSrc,
      href: product.href,
      sourceUrl: product.sourceUrl,
      isPublished: true,
      sortOrder: categoryIndex * 100 + productIndex,
      createdAt: now,
      updatedAt: now,
    })),
  );
}

export function buildSeedDetails(): AdminProductDetails[] {
  const now = nowIso();
  return shopCatalogLocal.categories.flatMap((category) =>
    category.products
      .filter((product) => product.details)
      .map((product) => ({
        productId: product.id,
        overview: product.details!.overview,
        features: product.details!.features,
        applications: product.details!.applications,
        specifications: product.details!.specifications,
        updatedAt: now,
      })),
  );
}

export function buildSeedHome(): AdminHomeContent {
  return structuredClone(homeContentLocal);
}

export function buildSeedAbout(): AdminAboutContent {
  return structuredClone(aboutContentLocal);
}

export function buildSeedContact(): AdminContactContent {
  return structuredClone(contactContentLocal);
}

export const SUPER_ADMIN_CREDENTIALS = {
  email: SUPER_EMAIL,
  password: SUPER_PASSWORD,
} as const;
