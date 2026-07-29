import type { Metadata } from "next";
import { AdminCategoryFormView } from "@/presentation/admin/components/AdminCategoriesView";

export const metadata: Metadata = {
  title: "Edit Category | Angel Starch Admin",
};

export default async function AdminEditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminCategoryFormView mode="edit" id={id} />;
}
