import type { Metadata } from "next";
import { AdminSeoView } from "@/presentation/admin/components/AdminSeoView";

export const metadata: Metadata = {
  title: "SEO",
};

export default function AdminSeoPage() {
  return <AdminSeoView />;
}
