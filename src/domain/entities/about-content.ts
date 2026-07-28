export interface AboutContent {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  story: string[];
  leadership: {
    name: string;
    experience: string;
    statement: string;
  };
  quality: {
    headline: string;
    body: string;
    checks: string[];
  };
  infrastructure: {
    headline: string;
    points: string[];
  };
  sectorsHeadline: string;
  sectors: string[];
  markets: {
    headline: string;
    body: string;
  };
  membership: string;
}
