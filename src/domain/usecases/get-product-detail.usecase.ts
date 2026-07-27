import type { ProductDetail } from "../entities/product-detail";
import type { ProductRepository } from "../repositories/product.repository";

export class GetProductDetailUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(slug: string): Promise<ProductDetail | null> {
    return this.repository.getBySlug(slug);
  }
}
