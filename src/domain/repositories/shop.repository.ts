import type { ShopProduct } from "../entities/shop-product";

export interface ShopRepository {
  getCatalog(): Promise<ShopProduct[]>;
  getById(id: string): Promise<ShopProduct | null>;
}
