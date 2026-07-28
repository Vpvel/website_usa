import type { Metadata } from "next";
import {
  getContactContentUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { ContactPageView } from "@/presentation/components/contact/ContactPageView";

export const metadata: Metadata = {
  title: "Contact Us | Angel Starch & Food Inc.",
  description:
    "Contact Angel Starch & Food Inc. USA for starch sample requests, formulation support, and supply partnerships. Chicago, IL office.",
  keywords: [
    "Angel Starch contact",
    "USA starch sample request",
    "Chicago starch supplier",
    "modified starch USA",
  ],
};

export default async function ContactPage() {
  const [site, contact] = await Promise.all([
    getHomeContentUseCase.execute(),
    getContactContentUseCase.execute(),
  ]);

  return <ContactPageView site={site} contact={contact} />;
}
