"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/presentation/admin/components/AdminShell";
import { ImagePathField } from "@/presentation/admin/components/ImagePathField";
import { useAdminProductsViewModel } from "@/presentation/admin/viewmodels/useAdminProductsViewModel";
import { toKebabCase } from "@/data/datasources/admin-storage";

export function AdminProductsListView() {
  const vm = useAdminProductsViewModel();

  return (
    <AdminShell title="Products">
      <div className="admin-toolbar">
        <input
          placeholder="Search products"
          value={vm.search}
          onChange={(event) => vm.setSearch(event.target.value)}
        />
        <select
          value={vm.categoryFilter}
          onChange={(event) => vm.setCategoryFilter(event.target.value)}
        >
          <option value="">All categories</option>
          {vm.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      {vm.error ? <p className="admin-alert admin-alert--error">{vm.error}</p> : null}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price / kg</th>
              <th>MOQ</th>
              <th>Status</th>
              <th>Details</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {vm.products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="admin-product-cell">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.imageSrc} alt="" />
                    <div>
                      <strong>{product.name}</strong>
                      <small>{product.shortName}</small>
                    </div>
                  </div>
                </td>
                <td>{product.categoryId}</td>
                <td>${product.pricePerKg.toFixed(2)}</td>
                <td>{product.minOrderKg} kg</td>
                <td>
                  <span
                    className={`admin-badge ${product.isPublished ? "is-success" : "is-muted"}`}
                  >
                    {product.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <span
                    className={`admin-badge ${vm.detailsMap[product.id] ? "is-success" : "is-muted"}`}
                  >
                    {vm.detailsMap[product.id] ? "Ready" : "Missing"}
                  </span>
                </td>
                <td className="admin-table__actions">
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  <Link href={`/admin/products/${product.id}/details`}>Details</Link>
                  <button type="button" onClick={() => void vm.removeProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-form__actions">
        <Link href="/admin/products/new" className="btn btn--primary">
          Create product
        </Link>
      </div>
    </AdminShell>
  );
}

export function AdminProductFormView({
  mode,
  id,
}: {
  mode: "create" | "edit";
  id?: string;
}) {
  const vm = useAdminProductsViewModel(id);
  const router = useRouter();

  return (
    <AdminShell title={mode === "create" ? "Create product" : "Edit product"}>
      {vm.error ? <p className="admin-alert admin-alert--error">{vm.error}</p> : null}
      <form
        className="admin-form admin-form--card"
        onSubmit={(event) => {
          event.preventDefault();
          void (async () => {
            if (mode === "create") {
              const createdId = await vm.createProduct();
              if (createdId) router.push(`/admin/products/${createdId}`);
              return;
            }
            const ok = await vm.updateProduct();
            if (ok) router.push("/admin/products");
          })();
        }}
      >
        <div className="admin-form__grid">
          <label className="admin-field">
            <span>Product name</span>
            <input
              required
              value={vm.form.name}
              onChange={(event) => {
                const name = event.target.value;
                const slug = toKebabCase(name);
                vm.setForm({
                  ...vm.form,
                  name,
                  shortName: vm.form.shortName || name,
                  id: mode === "create" ? slug : vm.form.id,
                  href: mode === "create" ? `/shop/product/${slug}` : vm.form.href,
                });
              }}
            />
          </label>
          <label className="admin-field">
            <span>Short name</span>
            <input
              required
              value={vm.form.shortName}
              onChange={(event) =>
                vm.setForm({ ...vm.form, shortName: event.target.value })
              }
            />
          </label>
          <label className="admin-field">
            <span>Product slug</span>
            <input
              required
              disabled={mode === "edit"}
              value={vm.form.id}
              onChange={(event) => {
                const slug = toKebabCase(event.target.value);
                vm.setForm({
                  ...vm.form,
                  id: slug,
                  href: `/shop/product/${slug}`,
                });
              }}
            />
          </label>
          <label className="admin-field">
            <span>Category</span>
            <select
              required
              value={vm.form.categoryId}
              onChange={(event) =>
                vm.setForm({ ...vm.form, categoryId: event.target.value })
              }
            >
              <option value="">Select category</option>
              {vm.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          <label className="admin-field admin-field--full">
            <span>Summary</span>
            <textarea
              required
              rows={3}
              value={vm.form.summary}
              onChange={(event) =>
                vm.setForm({ ...vm.form, summary: event.target.value })
              }
            />
          </label>
          <label className="admin-field">
            <span>Price per kg (USD)</span>
            <input
              type="number"
              min={0.01}
              step={0.01}
              required
              value={vm.form.pricePerKg}
              onChange={(event) =>
                vm.setForm({ ...vm.form, pricePerKg: Number(event.target.value) })
              }
            />
          </label>
          <label className="admin-field">
            <span>Minimum order (kg)</span>
            <input
              type="number"
              min={1}
              required
              value={vm.form.minOrderKg}
              onChange={(event) =>
                vm.setForm({ ...vm.form, minOrderKg: Number(event.target.value) })
              }
            />
          </label>
          <label className="admin-field">
            <span>Packaging</span>
            <input
              required
              value={vm.form.packaging}
              onChange={(event) =>
                vm.setForm({ ...vm.form, packaging: event.target.value })
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
          <ImagePathField
            label="Product image path"
            value={vm.form.imageSrc}
            onChange={(imageSrc) => vm.setForm({ ...vm.form, imageSrc })}
            required
          />
          <label className="admin-field">
            <span>Storefront URL</span>
            <input
              required
              value={vm.form.href}
              onChange={(event) =>
                vm.setForm({ ...vm.form, href: event.target.value })
              }
            />
          </label>
          <label className="admin-field">
            <span>Source / reference URL</span>
            <input
              value={vm.form.sourceUrl}
              onChange={(event) =>
                vm.setForm({ ...vm.form, sourceUrl: event.target.value })
              }
            />
          </label>
        </div>
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
          {mode === "edit" && id ? (
            <Link href={`/admin/products/${id}/details`} className="btn btn--secondary">
              Edit details
            </Link>
          ) : null}
          <Link href="/admin/products" className="btn btn--secondary">
            Cancel
          </Link>
        </div>
      </form>
    </AdminShell>
  );
}
