import type { Metadata } from "next";
import { AdminProductsListView } from "@/presentation/admin/components/AdminProductsView";

export const metadata: Metadata = {
  title: "Products | Angel Starch Admin",
};

export default function AdminProductsPage() {
  return <AdminProductsListView />;
}
