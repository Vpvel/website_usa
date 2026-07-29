export interface CertificationBadge {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
}

export interface CertificationsContent {
  headline: string;
  body: string;
  items: CertificationBadge[];
}
