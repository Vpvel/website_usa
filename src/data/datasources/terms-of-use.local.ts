import type { LegalDocument } from "@/domain/entities/legal-document";

export const termsOfUseLocal: LegalDocument = {
  title: "Terms of Use",
  lastUpdated: "July 29, 2026",
  intro: [
    "These Terms of Use govern your access to and use of the Angel Starch & Food Inc. website and shop services in the United States. By using this site, you agree to these terms.",
  ],
  sections: [
    {
      id: "use",
      title: "1. Use of the website",
      paragraphs: [
        "You may browse product information, request samples, and place demo orders for evaluation. You agree not to misuse the site, attempt unauthorized access, or interfere with site operations.",
      ],
    },
    {
      id: "accounts",
      title: "2. Accounts",
      paragraphs: [
        "Account features on this demo site store information locally in your browser. You are responsible for keeping your sign-in details confidential.",
      ],
    },
    {
      id: "orders",
      title: "3. Orders and pricing",
      paragraphs: [
        "Product listings, quantities, and pricing shown in the shop are for demonstration. Confirmed commercial terms are provided separately by Angel Starch & Food Inc. for live transactions.",
      ],
    },
    {
      id: "ip",
      title: "4. Intellectual property",
      paragraphs: [
        "All trademarks, logos, product names, and content on this site remain the property of Angel Starch & Food Inc. or its licensors. You may not copy or redistribute site materials without permission.",
      ],
    },
    {
      id: "liability",
      title: "5. Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, Angel Starch & Food Inc. is not liable for indirect, incidental, or consequential damages arising from use of this website or demo shop.",
      ],
    },
    {
      id: "changes",
      title: "6. Changes",
      paragraphs: [
        "We may update these Terms of Use from time to time. Continued use of the site after changes means you accept the revised terms.",
      ],
    },
  ],
  contactNote:
    "Questions about these Terms of Use can be sent to our USA office.",
  contactEmail: "usa@angelstarch.com",
};
