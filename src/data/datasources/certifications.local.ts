import type { CertificationsContent } from "@/domain/entities/certification";

const base = "/images/ceritifcation";

export const certificationsLocal: CertificationsContent = {
  headline: "Certifications & accreditations",
  body: "Angel Starch maintains globally recognized quality, food safety, organic, and trade certifications that support trusted supply for US and international food brands.",
  items: [
    {
      id: "iso-9001",
      name: "ISO 9001",
      imageSrc: `${base}/ISO-9001-1024x1024.png`,
      imageAlt: "ISO 9001 quality management certification",
    },
    {
      id: "brcgs",
      name: "BRCGS",
      imageSrc: `${base}/brcs-new-tr-1024x1024.png`,
      imageAlt: "BRCGS food safety certification",
    },
    {
      id: "fssai",
      name: "FSSAI",
      imageSrc: `${base}/Fssai-1024x1024.png`,
      imageAlt: "FSSAI food safety license",
    },
    {
      id: "fda",
      name: "FDA",
      imageSrc: `${base}/FDA-1024x1024.png`,
      imageAlt: "FDA registration badge",
    },
    {
      id: "usda",
      name: "USDA Organic",
      imageSrc: `${base}/USDA-1024x1024.png`,
      imageAlt: "USDA Organic certification",
    },
    {
      id: "india-organic",
      name: "India Organic",
      imageSrc: `${base}/india_orh1.jpeg`,
      imageAlt: "India Organic certification",
    },
    {
      id: "halal",
      name: "Halal",
      imageSrc: `${base}/Halal-1024x1024.png`,
      imageAlt: "Halal certification",
    },
    {
      id: "juhf-halal",
      name: "JUHF Halal",
      imageSrc: `${base}/JUHF-HALAL-1024x1024.png`,
      imageAlt: "JUHF Halal certification",
    },
    {
      id: "kosher",
      name: "Kosher",
      imageSrc: `${base}/Kosher-Check-1024x1024.png`,
      imageAlt: "Kosher Check certification",
    },
    {
      id: "apeda",
      name: "APEDA",
      imageSrc: `${base}/APEDA-1024x1024.png`,
      imageAlt: "APEDA registration",
    },
    {
      id: "fieo",
      name: "FIEO",
      imageSrc: `${base}/FIEO-1024x1024.png`,
      imageAlt: "FIEO membership",
    },
    {
      id: "aeo",
      name: "AEO",
      imageSrc: `${base}/AEO-1024x1024.png`,
      imageAlt: "Authorized Economic Operator certification",
    },
    {
      id: "sedex",
      name: "Sedex",
      imageSrc: `${base}/Sedex-1024x1024.png`,
      imageAlt: "Sedex ethical trade membership",
    },
    {
      id: "zed",
      name: "ZED",
      imageSrc: `${base}/Zed-1024x1024.png`,
      imageAlt: "ZED certification",
    },
    {
      id: "spices-board",
      name: "Spices Board",
      imageSrc: `${base}/spices-board-1024x1024.png`,
      imageAlt: "Spices Board of India",
    },
    {
      id: "drug-license",
      name: "Drug License",
      imageSrc: `${base}/Drug-License-1024x1024.png`,
      imageAlt: "Drug license certification",
    },
  ],
};
