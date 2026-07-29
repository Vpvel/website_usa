"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/presentation/admin/components/AdminShell";
import { useAdminAuth } from "@/presentation/context/AdminAuthContext";
import { updateAdminUserUseCase } from "@/di/container";

function roleLabel(role: string) {
  if (role === "super_admin") return "Super Admin";
  if (role === "admin") return "Admin";
  return role;
}

export function AdminProfileView() {
  const { admin, logout, refreshAdmin } = useAdminAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!admin) return;
    setName(admin.name);
    setCompany(admin.company);
    setPhone(admin.phone);
  }, [admin]);

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (!admin) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateAdminUserUseCase.execute(admin.id, {
        name,
        company,
        phone,
        password: password.trim() || undefined,
      });
      await refreshAdmin();
      setPassword("");
      setSuccess("Profile updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  if (!admin) return null;

  return (
    <AdminShell title="My Profile">
      {error ? <p className="admin-alert admin-alert--error">{error}</p> : null}
      {success ? <p className="admin-alert admin-alert--success">{success}</p> : null}

      <div className="admin-profile">
        <section className="admin-form admin-form--card admin-profile__card">
          <div className="admin-profile__header">
            <div className="admin-profile__avatar" aria-hidden="true">
              {admin.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h2>{admin.name}</h2>
              <p>{admin.email}</p>
              <span className="admin-badge">{roleLabel(admin.role)}</span>
            </div>
          </div>

          <form className="admin-form" onSubmit={handleSave}>
            <label className="admin-field">
              <span>Full name</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="admin-field">
              <span>Email address</span>
              <input type="email" value={admin.email} disabled />
            </label>
            <label className="admin-field">
              <span>Role</span>
              <input value={roleLabel(admin.role)} disabled />
            </label>
            <label className="admin-field">
              <span>Company</span>
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </label>
            <label className="admin-field">
              <span>Phone</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
            <label className="admin-field">
              <span>New password (optional)</span>
              <input
                type="password"
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </label>

            <div className="admin-form__actions">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={saving}
              >
                {saving ? "Saving…" : "Save profile"}
              </button>
              <button
                type="button"
                className="btn btn--secondary admin-profile__logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </form>
        </section>
      </div>
    </AdminShell>
  );
}
