import type { ApplicationArea } from "./application";
import type { FavoriteProduct } from "./favorite-product";
import type { NavItem } from "./nav-item";
import type { Product } from "./product";
import type { TrustFeature } from "./trust-feature";

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface FavoritesSectionContent {
  headline: string;
  subheadline: string;
  items: FavoriteProduct[];
}

export interface HomeContent {
  brandName: string;
  tagline: string;
  navigation: NavItem[];
  hero: HeroContent;
  trustFeatures: TrustFeature[];
  applications: ApplicationArea[];
  products: Product[];
  stats: StatItem[];
  whyPartner: {
    headline: string;
    points: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  favorites: FavoritesSectionContent;
}
