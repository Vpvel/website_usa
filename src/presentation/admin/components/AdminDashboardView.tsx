"use client";

import Link from "next/link";
import { AdminShell } from "@/presentation/admin/components/AdminShell";
import { useAdminDashboardViewModel } from "@/presentation/admin/viewmodels/useAdminDashboardViewModel";

export function AdminDashboardView() {
  const vm = useAdminDashboardViewModel();

  return (
    <AdminShell title="Dashboard">
      {vm.error ? (
        <p className="admin-alert admin-alert--error">{vm.error}</p>
      ) : null}
      <div className="admin-stats">
        <article className="admin-stat">
          <span>Total users</span>
          <strong>{vm.stats?.totalUsers ?? "—"}</strong>
        </article>
        <article className="admin-stat">
          <span>Categories</span>
          <strong>{vm.stats?.categoriesCount ?? "—"}</strong>
        </article>
        <article className="admin-stat">
          <span>Published products</span>
          <strong>{vm.stats?.productsPublished ?? "—"}</strong>
        </article>
        <article className="admin-stat">
          <span>Draft products</span>
          <strong>{vm.stats?.productsDraft ?? "—"}</strong>
        </article>
        <article className="admin-stat">
          <span>Missing details</span>
          <strong>{vm.stats?.productsMissingDetails ?? "—"}</strong>
        </article>
      </div>
      <div className="admin-quick-links">
        <Link href="/admin/products/new" className="btn btn--primary">
          Add product
        </Link>
        <Link href="/admin/home" className="btn btn--secondary">
          Edit home
        </Link>
        <Link href="/admin/about" className="btn btn--secondary">
          Edit about
        </Link>
        <Link href="/admin/contact" className="btn btn--secondary">
          Edit contact
        </Link>
        <Link href="/" className="btn btn--secondary" target="_blank">
          View storefront
        </Link>
      </div>
    </AdminShell>
  );
}
