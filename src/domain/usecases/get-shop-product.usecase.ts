import type { ShopProduct } from "../entities/shop-product";
import type { ShopRepository } from "../repositories/shop.repository";

export class GetShopProductUseCase {
  constructor(private readonly repository: ShopRepository) {}

  execute(id: string): Promise<ShopProduct | null> {
    return this.repository.getById(id);
  }
}
