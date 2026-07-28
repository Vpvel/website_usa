import type { ContactContent } from "@/domain/entities/contact-content";

export const contactContentLocal: ContactContent = {
  heroTitle: "Contact Us",
  heroSubtitle:
    "Talk with our US team about starch samples, formulation support, and supply partnerships.",
  breadcrumbs: [
    { label: "Angel Starch", href: "/" },
    { label: "Contact Us" },
  ],
  offices: [
    {
      label: "USA Office",
      companyLine: "Angel Starch & Food Inc.",
      lines: [
        "1250 Commerce Drive, Suite 400",
        "Chicago, IL 60601",
        "United States",
      ],
      phone: "+1 (312) 555-0148",
      email: "usa@angelstarch.com",
    },
    {
      label: "India Manufacturing",
      companyLine: "Angel Starch & Food Private Limited",
      lines: [
        "Erode, Tamil Nadu",
        "India",
      ],
      phone: "+91 424 000 0000",
      email: "info@angelstarch.com",
    },
  ],
  sampleForm: {
    headline: "Request a sample",
    body: "Tell us about your application and we will help match the right starch grade for US trials.",
    successMessage:
      "Thanks — your sample request was received. Our US team will follow up shortly.",
  },
  generalForm: {
    headline: "Send a message",
    body: "Questions about products, distribution, or partnership? Reach out and we will respond promptly.",
  },
};
