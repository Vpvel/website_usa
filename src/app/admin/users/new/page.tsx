import type { Metadata } from "next";
import { AdminUserFormView } from "@/presentation/admin/components/AdminUsersView";

export const metadata: Metadata = {
  title: "Create User | Angel Starch Admin",
};

export default function AdminCreateUserPage() {
  return <AdminUserFormView mode="create" />;
}
