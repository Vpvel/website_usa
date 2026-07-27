import type { ProductDetail } from "@/domain/entities/product-detail";
import type { ProductRepository } from "@/domain/repositories/product.repository";
import { productDetailsLocal } from "@/data/datasources/product-details.local";

export class ProductRepositoryImpl implements ProductRepository {
  async getBySlug(slug: string): Promise<ProductDetail | null> {
    return productDetailsLocal.find((item) => item.slug === slug) ?? null;
  }
}
