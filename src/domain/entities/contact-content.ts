export interface ContactOffice {
  label: string;
  companyLine: string;
  lines: string[];
  phone: string;
  email: string;
}

export interface ContactContent {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  offices: ContactOffice[];
  sampleForm: {
    headline: string;
    body: string;
    successMessage: string;
  };
  generalForm: {
    headline: string;
    body: string;
  };
}
