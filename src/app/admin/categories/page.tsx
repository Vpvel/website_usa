import type { Metadata } from "next";
import { AdminCategoriesListView } from "@/presentation/admin/components/AdminCategoriesView";

export const metadata: Metadata = {
  title: "Categories | Angel Starch Admin",
};

export default function AdminCategoriesPage() {
  return <AdminCategoriesListView />;
}
