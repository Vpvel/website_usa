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

export interface BannerSlide {
  id: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  sortOrder: number;
  isPublished: boolean;
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

export interface WhyPartnerContent {
  headline: string;
  body: string[];
  points: string[];
  experienceValue: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomeContent {
  brandName: string;
  tagline: string;
  navigation: NavItem[];
  hero: HeroContent;
  shopBanners: BannerSlide[];
  trustFeatures: TrustFeature[];
  applications: ApplicationArea[];
  products: Product[];
  stats: StatItem[];
  whyPartner: WhyPartnerContent;
  favorites: FavoritesSectionContent;
}
