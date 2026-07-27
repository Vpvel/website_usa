import type { ProductDetail } from "../entities/product-detail";

export interface ProductRepository {
  getBySlug(slug: string): Promise<ProductDetail | null>;
}
