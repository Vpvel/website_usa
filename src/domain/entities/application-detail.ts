export interface RelatedIngredient {
  id: string;
  name: string;
  code: string;
  learnMoreHref: string;
}

export interface IngredientCard {
  id: string;
  name: string;
  href: string;
  learnMoreHref?: string;
}

export interface ApplicationDetail {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  pageHeadline: string;
  intro: string[];
  needsHeading: string;
  needs: string[];
  growthHeading: string;
  growthAreas: string[];
  webinar: {
    title: string;
    description: string;
    points: string[];
    ctaLabel: string;
    ctaHref: string;
    imageSrc: string;
  };
  texture: {
    boostHeadline: string;
    boostBody: string;
    headline: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    visualWords: string[];
    imageSrc: string;
  };
  goalsCta: {
    headline: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  /** @deprecated Kept for SEO keyword fallback; UI uses ingredientCards only */
  relatedIngredients: RelatedIngredient[];
  ingredientCards: IngredientCard[];
}
