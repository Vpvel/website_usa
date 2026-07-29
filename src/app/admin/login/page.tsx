import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginView } from "@/presentation/admin/components/AdminLoginView";

export const metadata: Metadata = {
  title: "Super Login | Angel Starch Admin",
  description: "Sign in to the Angel Starch admin panel.",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="admin-loading"><p>Loading…</p></div>}>
      <AdminLoginView />
    </Suspense>
  );
}
