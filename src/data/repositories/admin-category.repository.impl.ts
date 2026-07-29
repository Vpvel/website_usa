import type {
  AdminCategory,
  CreateAdminCategoryInput,
  UpdateAdminCategoryInput,
} from "@/domain/entities/admin";
import type { AdminCategoryRepository } from "@/domain/repositories/admin-category.repository";
import { buildSeedCategories } from "@/data/datasources/admin-seed.local";
import {
  ADMIN_CATEGORIES_KEY,
  ADMIN_PRODUCTS_KEY,
  nowIso,
  readJson,
  writeJson,
} from "@/data/datasources/admin-storage";
import type { AdminProduct } from "@/domain/entities/admin";

function ensureCategories(): AdminCategory[] {
  const existing = readJson<AdminCategory[] | null>(ADMIN_CATEGORIES_KEY, null);
  if (existing && existing.length > 0) return existing;
  const seed = buildSeedCategories();
  writeJson(ADMIN_CATEGORIES_KEY, seed);
  return seed;
}

export class AdminCategoryRepositoryImpl implements AdminCategoryRepository {
  async list(): Promise<AdminCategory[]> {
    return ensureCategories().sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getById(id: string): Promise<AdminCategory | null> {
    return ensureCategories().find((item) => item.id === id) ?? null;
  }

  async create(input: CreateAdminCategoryInput): Promise<AdminCategory> {
    const categories = ensureCategories();
    if (categories.some((item) => item.id === input.id)) {
      throw new Error("Category slug already exists.");
    }

    const now = nowIso();
    const created: AdminCategory = {
      id: input.id,
      title: input.title.trim(),
      description: input.description.trim(),
      overview: input.overview?.trim(),
      features: input.features ?? [],
      applications: input.applications ?? [],
      specifications: input.specifications ?? [],
      sortOrder: input.sortOrder ?? categories.length,
      isPublished: input.isPublished ?? true,
      createdAt: now,
      updatedAt: now,
    };

    writeJson(ADMIN_CATEGORIES_KEY, [...categories, created]);
    return created;
  }

  async update(
    id: string,
    input: UpdateAdminCategoryInput,
  ): Promise<AdminCategory> {
    const categories = ensureCategories();
    const index = categories.findIndex((item) => item.id === id);
    if (index < 0) throw new Error("Category not found.");

    categories[index] = {
      ...categories[index],
      ...input,
      title: input.title?.trim() ?? categories[index].title,
      description: input.description?.trim() ?? categories[index].description,
      overview:
        input.overview !== undefined
          ? input.overview.trim()
          : categories[index].overview,
      updatedAt: nowIso(),
    };

    writeJson(ADMIN_CATEGORIES_KEY, categories);
    return categories[index];
  }

  async delete(id: string): Promise<void> {
    const products = readJson<AdminProduct[]>(ADMIN_PRODUCTS_KEY, []);
    if (products.some((item) => item.categoryId === id)) {
      throw new Error("Cannot delete a category that still has products.");
    }

    const next = ensureCategories().filter((item) => item.id !== id);
    writeJson(ADMIN_CATEGORIES_KEY, next);
  }

  async productCount(id: string): Promise<number> {
    let products = readJson<AdminProduct[] | null>(ADMIN_PRODUCTS_KEY, null);
    if (!products || products.length === 0) {
      const { buildSeedProducts } = await import(
        "@/data/datasources/admin-seed.local"
      );
      products = buildSeedProducts();
      writeJson(ADMIN_PRODUCTS_KEY, products);
    }
    return products.filter((item) => item.categoryId === id).length;
  }
}

