export interface ProductDetail {
  slug: string;
  name: string;
  headline: string;
  publishedAt: string;
  lead: string;
  body: string[];
  heroImageSrc: string;
  heroImageAlt: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
}
