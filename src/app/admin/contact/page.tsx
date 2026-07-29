import type { Metadata } from "next";
import { AdminContactView } from "@/presentation/admin/components/AdminContactView";

export const metadata: Metadata = {
  title: "Contact Us CMS | Angel Starch Admin",
};

export default function AdminContactPage() {
  return <AdminContactView />;
}
