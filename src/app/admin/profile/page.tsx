import type { Metadata } from "next";
import { AdminProfileView } from "@/presentation/admin/components/AdminProfileView";

export const metadata: Metadata = {
  title: "My Profile | Angel Starch Admin",
};

export default function AdminProfilePage() {
  return <AdminProfileView />;
}
