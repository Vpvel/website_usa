import type { Metadata } from "next";
import { AdminProductFormView } from "@/presentation/admin/components/AdminProductsView";

export const metadata: Metadata = {
  title: "Edit Product | Angel Starch Admin",
};

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminProductFormView mode="edit" id={id} />;
}
