export interface ShopProduct {
  id: string;
  name: string;
  shortName: string;
  summary: string;
  pricePerKg: number;
  currency: "USD";
  minOrderKg: number;
  packaging: string;
  category: "bakery-modified-starch";
  imageSrc: string;
  href: string;
  sourceUrl: string;
}
