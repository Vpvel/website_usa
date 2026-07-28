import type { ShopProduct } from "./shop-product";

export interface CartItem {
  product: ShopProduct;
  quantityKg: number;
}

export interface Cart {
  items: CartItem[];
}
