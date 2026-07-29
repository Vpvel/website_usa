import type { Metadata } from "next";
import { AdminUserFormView } from "@/presentation/admin/components/AdminUsersView";

export const metadata: Metadata = {
  title: "Edit User | Angel Starch Admin",
};

export default async function AdminEditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminUserFormView mode="edit" id={id} />;
}
