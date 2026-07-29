import type { Metadata } from "next";
import { AdminCategoryFormView } from "@/presentation/admin/components/AdminCategoriesView";

export const metadata: Metadata = {
  title: "Create Category | Angel Starch Admin",
};

export default function AdminCreateCategoryPage() {
  return <AdminCategoryFormView mode="create" />;
}
