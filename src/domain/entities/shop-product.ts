export type ShopCategoryId = string;

export interface ShopProductSpec {
  property: string;
  value: string;
}

export interface ShopProductDetails {
  overview: string;
  features: string[];
  applications: string[];
  specifications: ShopProductSpec[];
}

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
  details?: ShopProductDetails;
}

export interface ShopCategory {
  id: ShopCategoryId;
  title: string;
  description: string;
  overview?: string;
  features?: string[];
  applications?: string[];
  specifications?: ShopProductSpec[];
  products: ShopProduct[];
}

export interface ShopCatalog {
  categories: ShopCategory[];
}
