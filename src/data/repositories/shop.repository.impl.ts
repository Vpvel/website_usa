import type { ShopCatalog, ShopProduct } from "@/domain/entities/shop-product";
import type { ShopRepository } from "@/domain/repositories/shop.repository";
import {
  shopCatalogLocal,
  shopProductsFlat,
} from "@/data/datasources/shop-catalog.local";

export class ShopRepositoryImpl implements ShopRepository {
  async getCatalog(): Promise<ShopCatalog> {
    return shopCatalogLocal;
  }

  async getById(id: string): Promise<ShopProduct | null> {
    return shopProductsFlat.find((item) => item.id === id) ?? null;
  }
}
