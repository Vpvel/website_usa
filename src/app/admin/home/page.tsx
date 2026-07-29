import type { Metadata } from "next";
import { AdminHomeView } from "@/presentation/admin/components/AdminHomeView";

export const metadata: Metadata = {
  title: "Content CMS | Angel Starch Admin",
};

export default function AdminHomePage() {
  return <AdminHomeView />;
}
