import type { Metadata } from "next";
import { AdminProductFormView } from "@/presentation/admin/components/AdminProductsView";

export const metadata: Metadata = {
  title: "Create Product | Angel Starch Admin",
};

export default function AdminCreateProductPage() {
  return <AdminProductFormView mode="create" />;
}
