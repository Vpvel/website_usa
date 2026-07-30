"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/presentation/admin/components/AdminShell";
import {
  AdminListToolbar,
  AdminTableEmpty,
  AdminTableLoading,
} from "@/presentation/admin/components/AdminListToolbar";
import { useAdminCategoriesViewModel } from "@/presentation/admin/viewmodels/useAdminCategoriesViewModel";
import { toKebabCase } from "@/data/datasources/admin-storage";

export function AdminCategoriesListView() {
  const vm = useAdminCategoriesViewModel();

  return (
    <AdminShell title="Categories">
      <AdminListToolbar
        filters={
          <>
            <input
              placeholder="Search categories"
              value={vm.search}
              onChange={(event) => vm.setSearch(event.target.value)}
              aria-label="Search categories"
            />
            <select
              value={vm.statusFilter}
              onChange={(event) => vm.setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </>
        }
        actions={
          <Link href="/admin/categories/new" className="btn btn--primary">
            Create category
          </Link>
        }
        meta={
          vm.loading
            ? "Loading categories…"
            : `${vm.categories.length} categor${vm.categories.length === 1 ? "y" : "ies"}`
        }
      />
      {vm.error ? <p className="admin-alert admin-alert--error">{vm.error}</p> : null}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th className="admin-table__col-num">Order</th>
              <th className="admin-table__col-num">Products</th>
              <th className="admin-table__col-status">Status</th>
              <th className="admin-table__col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vm.loading ? (
              <AdminTableLoading colSpan={6} />
            ) : vm.categories.length === 0 ? (
              <AdminTableEmpty
                colSpan={6}
                message="No categories match your search or filters."
              />
            ) : (
              vm.categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.title}</td>
                  <td>
                    <code>{category.id}</code>
                  </td>
                  <td>{category.sortOrder}</td>
                  <td>{vm.counts[category.id] ?? 0}</td>
                  <td>
                    <span
                      className={`admin-badge ${category.isPublished ? "is-success" : "is-muted"}`}
                    >
                      {category.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="admin-table__actions">
                    <Link href={`/admin/categories/${category.id}`}>Edit</Link>
                    <button type="button" onClick={() => void vm.removeCategory(category.id)}>
                      Delete
                    </button>
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

export function AdminCategoryFormView({
  mode,
  id,
}: {
  mode: "create" | "edit";
  id?: string;
}) {
  const vm = useAdminCategoriesViewModel(id);
  const router = useRouter();

  return (
    <AdminShell title={mode === "create" ? "Create category" : "Edit category"}>
      {vm.error ? <p className="admin-alert admin-alert--error">{vm.error}</p> : null}
      <form
        className="admin-form admin-form--card"
        onSubmit={(event) => {
          event.preventDefault();
          void (async () => {
            const ok =
              mode === "create"
                ? await vm.createCategory()
                : await vm.updateCategory();
            if (ok) router.push("/admin/categories");
          })();
        }}
      >
        <label className="admin-field">
          <span>Category title</span>
          <input
            required
            value={vm.form.title}
            onChange={(event) => {
              const title = event.target.value;
              vm.setForm({
                ...vm.form,
                title,
                id:
                  mode === "create" && !vm.form.id
                    ? toKebabCase(title)
                    : mode === "create"
                      ? toKebabCase(title)
                      : vm.form.id,
              });
            }}
          />
        </label>
        <label className="admin-field">
          <span>Category slug</span>
          <input
            required
            disabled={mode === "edit"}
            value={vm.form.id}
            onChange={(event) =>
              vm.setForm({ ...vm.form, id: toKebabCase(event.target.value) })
            }
          />
        </label>
        <label className="admin-field">
          <span>Short description</span>
          <textarea
            required
            rows={3}
            value={vm.form.description}
            onChange={(event) =>
              vm.setForm({ ...vm.form, description: event.target.value })
            }
          />
        </label>
        <label className="admin-field">
          <span>Overview</span>
          <textarea
            rows={4}
            value={vm.form.overview}
            onChange={(event) =>
              vm.setForm({ ...vm.form, overview: event.target.value })
            }
          />
        </label>
        <label className="admin-field">
          <span>Key features (one per line)</span>
          <textarea
            rows={4}
            value={vm.form.featuresText}
            onChange={(event) =>
              vm.setForm({ ...vm.form, featuresText: event.target.value })
            }
          />
        </label>
        <label className="admin-field">
          <span>Applications (one per line)</span>
          <textarea
            rows={4}
            value={vm.form.applicationsText}
            onChange={(event) =>
              vm.setForm({ ...vm.form, applicationsText: event.target.value })
            }
          />
        </label>
        <label className="admin-field">
          <span>Display order</span>
          <input
            type="number"
            min={0}
            value={vm.form.sortOrder}
            onChange={(event) =>
              vm.setForm({ ...vm.form, sortOrder: Number(event.target.value) })
            }
          />
        </label>
        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={vm.form.isPublished}
            onChange={(event) =>
              vm.setForm({ ...vm.form, isPublished: event.target.checked })
            }
          />
          <span>Published</span>
        </label>
        <div className="admin-form__actions">
          <button type="submit" className="btn btn--primary" disabled={vm.saving}>
            {vm.saving ? "Saving…" : "Save"}
          </button>
          <Link href="/admin/categories" className="btn btn--secondary">
            Cancel
          </Link>
        </div>
      </form>
    </AdminShell>
  );
}
