import type {
  AdminProduct,
  AdminProductDetails,
  CreateAdminProductInput,
  UpdateAdminProductInput,
} from "@/domain/entities/admin";
import type { AdminProductRepository } from "@/domain/repositories/admin-product.repository";
import {
  buildSeedDetails,
  buildSeedProducts,
} from "@/data/datasources/admin-seed.local";
import {
  ADMIN_DETAILS_KEY,
  ADMIN_PRODUCTS_KEY,
  nowIso,
  readJson,
  writeJson,
} from "@/data/datasources/admin-storage";

function ensureProducts(): AdminProduct[] {
  const existing = readJson<AdminProduct[] | null>(ADMIN_PRODUCTS_KEY, null);
  if (existing && existing.length > 0) return existing;
  const seed = buildSeedProducts();
  writeJson(ADMIN_PRODUCTS_KEY, seed);
  return seed;
}

function ensureDetails(): AdminProductDetails[] {
  const existing = readJson<AdminProductDetails[] | null>(ADMIN_DETAILS_KEY, null);
  if (existing && existing.length > 0) return existing;
  const seed = buildSeedDetails();
  writeJson(ADMIN_DETAILS_KEY, seed);
  return seed;
}

export class AdminProductRepositoryImpl implements AdminProductRepository {
  async list(filter?: { categoryId?: string }): Promise<AdminProduct[]> {
    let products = ensureProducts();
    if (filter?.categoryId) {
      products = products.filter((item) => item.categoryId === filter.categoryId);
    }
    return products.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getById(id: string): Promise<AdminProduct | null> {
    return ensureProducts().find((item) => item.id === id) ?? null;
  }

  async create(input: CreateAdminProductInput): Promise<AdminProduct> {
    const products = ensureProducts();
    if (products.some((item) => item.id === input.id)) {
      throw new Error("Product slug already exists.");
    }

    const now = nowIso();
    const created: AdminProduct = {
      id: input.id,
      name: input.name.trim(),
      shortName: input.shortName.trim(),
      summary: input.summary.trim(),
      pricePerKg: input.pricePerKg,
      currency: "USD",
      minOrderKg: input.minOrderKg,
      packaging: input.packaging.trim(),
      categoryId: input.categoryId,
      imageSrc: input.imageSrc.trim(),
      href: (input.href?.trim() || `/shop/product/${input.id}`).trim(),
      sourceUrl: input.sourceUrl?.trim(),
      isPublished: input.isPublished ?? false,
      sortOrder: input.sortOrder ?? products.length,
      createdAt: now,
      updatedAt: now,
    };

    writeJson(ADMIN_PRODUCTS_KEY, [...products, created]);
    return created;
  }

  async update(
    id: string,
    input: UpdateAdminProductInput,
  ): Promise<AdminProduct> {
    const products = ensureProducts();
    const index = products.findIndex((item) => item.id === id);
    if (index < 0) throw new Error("Product not found.");

    products[index] = {
      ...products[index],
      ...input,
      name: input.name?.trim() ?? products[index].name,
      shortName: input.shortName?.trim() ?? products[index].shortName,
      summary: input.summary?.trim() ?? products[index].summary,
      packaging: input.packaging?.trim() ?? products[index].packaging,
      imageSrc: input.imageSrc?.trim() ?? products[index].imageSrc,
      href: input.href?.trim() ?? products[index].href,
      sourceUrl:
        input.sourceUrl !== undefined
          ? input.sourceUrl.trim()
          : products[index].sourceUrl,
      currency: "USD",
      updatedAt: nowIso(),
    };

    writeJson(ADMIN_PRODUCTS_KEY, products);
    return products[index];
  }

  async delete(id: string): Promise<void> {
    writeJson(
      ADMIN_PRODUCTS_KEY,
      ensureProducts().filter((item) => item.id !== id),
    );
    writeJson(
      ADMIN_DETAILS_KEY,
      ensureDetails().filter((item) => item.productId !== id),
    );
  }

  async getDetails(productId: string): Promise<AdminProductDetails | null> {
    return ensureDetails().find((item) => item.productId === productId) ?? null;
  }

  async upsertDetails(
    details: AdminProductDetails,
  ): Promise<AdminProductDetails> {
    const all = ensureDetails();
    const index = all.findIndex((item) => item.productId === details.productId);
    const next: AdminProductDetails = {
      ...details,
      updatedAt: nowIso(),
    };
    if (index >= 0) all[index] = next;
    else all.push(next);
    writeJson(ADMIN_DETAILS_KEY, all);
    return next;
  }

  async clearDetails(productId: string): Promise<void> {
    writeJson(
      ADMIN_DETAILS_KEY,
      ensureDetails().filter((item) => item.productId !== productId),
    );
  }

  async countMissingDetails(): Promise<number> {
    const products = ensureProducts();
    const details = ensureDetails();
    const withDetails = new Set(details.map((item) => item.productId));
    return products.filter((item) => !withDetails.has(item.id)).length;
  }
}
