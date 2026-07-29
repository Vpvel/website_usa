import type { Metadata } from "next";
import { AdminAboutView } from "@/presentation/admin/components/AdminAboutView";

export const metadata: Metadata = {
  title: "About Us CMS | Angel Starch Admin",
};

export default function AdminAboutPage() {
  return <AdminAboutView />;
}
