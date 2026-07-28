export type ShopCategoryId =
  | "bakery-modified-starch"
  | "potato-starch"
  | "tapioca-starch"
  | "food-additive"
  | "food-ingredients";

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
