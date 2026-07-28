import type { ShopCatalog } from "../entities/shop-product";
import type { ShopRepository } from "../repositories/shop.repository";

export class GetShopCatalogUseCase {
  constructor(private readonly repository: ShopRepository) {}

  execute(): Promise<ShopCatalog> {
    return this.repository.getCatalog();
  }
}
