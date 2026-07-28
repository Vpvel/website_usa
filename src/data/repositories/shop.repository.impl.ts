import type { ShopProduct } from "@/domain/entities/shop-product";
import type { ShopRepository } from "@/domain/repositories/shop.repository";
import { shopCatalogLocal } from "@/data/datasources/shop-catalog.local";

export class ShopRepositoryImpl implements ShopRepository {
  async getCatalog(): Promise<ShopProduct[]> {
    return shopCatalogLocal;
  }

  async getById(id: string): Promise<ShopProduct | null> {
    return shopCatalogLocal.find((item) => item.id === id) ?? null;
  }
}
