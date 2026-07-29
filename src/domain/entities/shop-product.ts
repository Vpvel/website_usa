export type ShopCategoryId =
  | "native-starch"
  | "organic-products"
  | "sweetener"
  | "clean-label-starch"
  | "modified-starch";

export interface ShopProduct {
  id: string;
  name: string;
  shortName: string;
  summary: string;
  pricePerKg: number;
  currency: "USD";
  minOrderKg: number;
  packaging: string;
  category: ShopCategoryId;
  imageSrc: string;
  href: string;
  sourceUrl: string;
}

export interface ShopCategory {
  id: ShopCategoryId;
  title: string;
  description: string;
  products: ShopProduct[];
}

export interface ShopCatalog {
  categories: ShopCategory[];
}
