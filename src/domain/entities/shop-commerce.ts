import type { ShopProduct } from "./shop-product";
import type { CartItem } from "./cart";

export interface ShippingAddress {
  id: string;
  fullName: string;
  company: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface ShopOrder {
  id: string;
  createdAt: string;
  status: "submitted" | "processing" | "quoted";
  items: CartItem[];
  itemCountKg: number;
  subtotal: number;
  address: ShippingAddress;
  note: string;
}

export type WishlistItem = ShopProduct;
