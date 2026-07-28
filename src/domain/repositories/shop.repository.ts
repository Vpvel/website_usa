import type { ShopCatalog, ShopProduct } from "../entities/shop-product";

export interface ShopRepository {
  getCatalog(): Promise<ShopCatalog>;
  getById(id: string): Promise<ShopProduct | null>;
}
