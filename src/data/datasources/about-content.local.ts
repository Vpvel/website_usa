import type { AboutContent } from "@/domain/entities/about-content";

export const aboutContentLocal: AboutContent = {
  brandName: "Angel Starch & Food Private Limited",
  heroTitle: "About Angel Starch",
  heroSubtitle:
    "Customer Focussed Innovation — manufacturing, supplying, and exporting starch solutions since 1990.",
  heroImageSrc: "/images/about/angel-starch-factory.png",
  heroImageAlt:
    "Angel Starch & Food Pvt. Ltd. manufacturing facility in Erode, Tamil Nadu",
  breadcrumbs: [
    { label: "Angel Starch", href: "/" },
    { label: "About Us" },
  ],
  story: [
    "Sree Mangalmoorthi Starch Industries was started in the year 1990 for Native Starches and in 2010 Angel Starch & Food Private Limited was established in Erode, Tamil Nadu.",
    "Our core value of ‘Customer Focussed Innovation’ has made us emerge as one of the largest manufacturers, suppliers and exporters of wide varieties of starch in India.",
    "We have a registration and membership under the Certificate of Agricultural and Processed Food Products Export Development Authority.",
  ],
  leadership: {
    name: "Mr. V. P. S. Radhakrishnan",
    experience: "36 years of industry experience",
    statement:
      "Under the guidance of Mr. V. P. S. Radhakrishnan and his vast industry experience of 36 years, we are able to deliver the best to our ever-growing clientele.",
  },
  quality: {
    headline: "Quality is our prime concern",
    body: "Our exceptional product range is well known in the market. Quality of the products has always been our prime concern. We take stringent measures to check our products on various parameters.",
    checks: [
      "Composition",
      "Viscosity",
      "pH value",
      "Purity",
      "Effectiveness",
    ],
  },
  infrastructure: {
    headline: "State-of-the-art infrastructure",
    points: [
      "Processing unit",
      "Quality checking unit",
      "Warehouse",
      "Packaging section",
    ],
  },
  sectorsHeadline: "Our starch products find application in various sectors:",
  sectors: [
    "Food",
    "Textile sizing",
    "Paper",
    "Packaging",
    "Textile processing",
    "Pharmaceuticals",
    "Bio-polymers",
    "Nutraceutical",
    "Adhesives",
  ],
  markets: {
    headline: "Domestic and international reach",
    body: "Over the years, we have created a niche for ourselves in the domestic and international market. We have expanded our markets across different parts of Indian Subcontinent, Middle East and South East-Asia.",
  },
  membership:
    "Registered member under APEDA — Agricultural and Processed Food Products Export Development Authority.",
};
