import type { ShopProduct } from "../entities/shop-product";
import type { ShopRepository } from "../repositories/shop.repository";

export class GetShopCatalogUseCase {
  constructor(private readonly repository: ShopRepository) {}

  execute(): Promise<ShopProduct[]> {
    return this.repository.getCatalog();
  }
}
