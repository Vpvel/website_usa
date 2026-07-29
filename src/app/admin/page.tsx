import type { Metadata } from "next";
import { AdminDashboardView } from "@/presentation/admin/components/AdminDashboardView";

export const metadata: Metadata = {
  title: "Dashboard | Angel Starch Admin",
};

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
