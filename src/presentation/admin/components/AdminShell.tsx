"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAdminAuth } from "@/presentation/context/AdminAuthContext";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/home", label: "Home Content" },
  { href: "/admin/about", label: "About Us" },
  { href: "/admin/contact", label: "Contact Us" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/profile", label: "Profile" },
];

function roleLabel(role: string) {
  if (role === "super_admin") return "Super Admin";
  if (role === "admin") return "Admin";
  return role;
}

export function AdminShell({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const { admin, hydrated } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hydrated) return;
    if (!admin) router.replace("/admin/login");
  }, [admin, hydrated, router]);

  if (!hydrated || !admin) {
    return (
      <div className="admin-loading">
        <p>Loading admin…</p>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__mark">AS</span>
          <div>
            <strong>Angel Starch</strong>
            <small>Admin Panel</small>
          </div>
        </div>
        <nav className="admin-sidebar__nav">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar__link${active ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar__eyebrow">Angel Starch Admin</p>
            <h1>{title}</h1>
          </div>
          <div className="admin-topbar__meta">
            {actions}
            <Link
              href="/admin/profile"
              className={`admin-topbar__user${pathname === "/admin/profile" ? " is-active" : ""}`}
              title="Open profile"
            >
              <strong>{admin.name}</strong>
              <span className="admin-badge">{roleLabel(admin.role)}</span>
            </Link>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
