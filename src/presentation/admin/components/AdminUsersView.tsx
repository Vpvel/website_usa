"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/presentation/admin/components/AdminShell";
import {
  AdminListToolbar,
  AdminTableEmpty,
  AdminTableLoading,
} from "@/presentation/admin/components/AdminListToolbar";
import { useAdminUsersViewModel } from "@/presentation/admin/viewmodels/useAdminUsersViewModel";
import type { AdminRole } from "@/domain/entities/admin";

function roleBadge(role: AdminRole) {
  if (role === "super_admin") return "Super Admin";
  if (role === "admin") return "Admin";
  return "Customer";
}

export function AdminUsersListView() {
  const vm = useAdminUsersViewModel();

  return (
    <AdminShell title="Users">
      <AdminListToolbar
        filters={
          <>
            <input
              placeholder="Search name or email"
              value={vm.query}
              onChange={(event) => vm.setQuery(event.target.value)}
              aria-label="Search users"
            />
            <select
              value={vm.roleFilter}
              onChange={(event) => vm.setRoleFilter(event.target.value)}
              aria-label="Filter by role"
            >
              <option value="">All roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <select
              value={vm.statusFilter}
              onChange={(event) => vm.setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </>
        }
        actions={
          <Link href="/admin/users/new" className="btn btn--primary">
            Create user
          </Link>
        }
        meta={
          vm.loading
            ? "Loading users…"
            : `${vm.users.length} user${vm.users.length === 1 ? "" : "s"}`
        }
      />

      {vm.error ? <p className="admin-alert admin-alert--error">{vm.error}</p> : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th className="admin-table__col-role">Role</th>
              <th className="admin-table__col-status">Status</th>
              <th className="admin-table__col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vm.loading ? (
              <AdminTableLoading colSpan={6} />
            ) : vm.users.length === 0 ? (
              <AdminTableEmpty colSpan={6} message="No users match your search or filters." />
            ) : (
              vm.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.company || "—"}</td>
                  <td>
                    <span className="admin-badge">{roleBadge(user.role)}</span>
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${user.isActive ? "is-success" : "is-muted"}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="admin-table__actions">
                    <Link href={`/admin/users/${user.id}`}>Edit</Link>
                    {user.isActive ? (
                      <button
                        type="button"
                        onClick={() => void vm.deactivateUser(user.id)}
                      >
                        Deactivate
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

export function AdminUserFormView({ mode, id }: { mode: "create" | "edit"; id?: string }) {
  const vm = useAdminUsersViewModel(id);
  const router = useRouter();

  return (
    <AdminShell title={mode === "create" ? "Create user" : "Edit user"}>
      {vm.error ? <p className="admin-alert admin-alert--error">{vm.error}</p> : null}
      <form
        className="admin-form admin-form--card"
        onSubmit={(event) => {
          event.preventDefault();
          void (async () => {
            const ok =
              mode === "create" ? await vm.createUser() : await vm.updateUser();
            if (ok) router.push("/admin/users");
          })();
        }}
      >
        <label className="admin-field">
          <span>Full name</span>
          <input
            required
            value={vm.form.name}
            onChange={(event) => vm.setForm({ ...vm.form, name: event.target.value })}
          />
        </label>
        <label className="admin-field">
          <span>Email address</span>
          <input
            type="email"
            required
            value={vm.form.email}
            onChange={(event) => vm.setForm({ ...vm.form, email: event.target.value })}
          />
        </label>
        <label className="admin-field">
          <span>{mode === "create" ? "Password" : "Reset password (optional)"}</span>
          <input
            type="password"
            minLength={mode === "create" ? 6 : undefined}
            required={mode === "create"}
            value={vm.form.password}
            onChange={(event) =>
              vm.setForm({ ...vm.form, password: event.target.value })
            }
          />
        </label>
        <label className="admin-field">
          <span>Company</span>
          <input
            value={vm.form.company}
            onChange={(event) =>
              vm.setForm({ ...vm.form, company: event.target.value })
            }
          />
        </label>
        <label className="admin-field">
          <span>Phone</span>
          <input
            value={vm.form.phone}
            onChange={(event) => vm.setForm({ ...vm.form, phone: event.target.value })}
          />
        </label>
        <label className="admin-field">
          <span>Role</span>
          <select
            value={vm.form.role}
            onChange={(event) =>
              vm.setForm({ ...vm.form, role: event.target.value as AdminRole })
            }
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </label>
        {mode === "edit" ? (
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={vm.form.isActive}
              onChange={(event) =>
                vm.setForm({ ...vm.form, isActive: event.target.checked })
              }
            />
            <span>Account active</span>
          </label>
        ) : null}
        <div className="admin-form__actions">
          <button type="submit" className="btn btn--primary" disabled={vm.saving}>
            {vm.saving ? "Saving…" : "Save"}
          </button>
          <Link href="/admin/users" className="btn btn--secondary">
            Cancel
          </Link>
        </div>
      </form>
    </AdminShell>
  );
}
