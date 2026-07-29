import type { Metadata } from "next";
import { AdminProductDetailsView } from "@/presentation/admin/components/AdminProductDetailsView";

export const metadata: Metadata = {
  title: "Product Details | Angel Starch Admin",
};

export default async function AdminProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminProductDetailsView productId={id} />;
}
