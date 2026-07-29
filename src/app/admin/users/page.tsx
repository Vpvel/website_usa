import type { Metadata } from "next";
import { AdminUsersListView } from "@/presentation/admin/components/AdminUsersView";

export const metadata: Metadata = {
  title: "Users | Angel Starch Admin",
};

export default function AdminUsersPage() {
  return <AdminUsersListView />;
}
