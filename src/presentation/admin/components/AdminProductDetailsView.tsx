"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ShopProductSpec } from "@/domain/entities/shop-product";
import {
  getAdminProductByIdUseCase,
  getAdminProductDetailsUseCase,
  upsertAdminProductDetailsUseCase,
} from "@/di/container";
import { AdminShell } from "@/presentation/admin/components/AdminShell";

export function AdminProductDetailsView({ productId }: { productId: string }) {
  const [productName, setProductName] = useState(productId);
  const [overview, setOverview] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [applicationsText, setApplicationsText] = useState("");
  const [specifications, setSpecifications] = useState<ShopProductSpec[]>([
    { property: "", value: "" },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const product = await getAdminProductByIdUseCase.execute(productId);
      if (product) setProductName(product.name);
      const details = await getAdminProductDetailsUseCase.execute(productId);
      if (!details) return;
      setOverview(details.overview);
      setFeaturesText(details.features.join("\n"));
      setApplicationsText(details.applications.join("\n"));
      setSpecifications(
        details.specifications.length > 0
          ? details.specifications
          : [{ property: "", value: "" }],
      );
    })();
  }, [productId]);

  async function save() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await upsertAdminProductDetailsUseCase.execute({
        productId,
        overview,
        features: featuresText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        applications: applicationsText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        specifications: specifications.filter(
          (item) => item.property.trim() && item.value.trim(),
        ),
        updatedAt: new Date().toISOString(),
      });
      setSuccess("Product details saved.");
      const { notifyAdminContentChanged } = await import(
        "@/data/datasources/admin-media.local"
      );
      notifyAdminContentChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title={`Details · ${productName}`}>
      {error ? <p className="admin-alert admin-alert--error">{error}</p> : null}
      {success ? <p className="admin-alert admin-alert--success">{success}</p> : null}
      <div className="admin-details-layout">
        <form
          className="admin-form admin-form--card"
          onSubmit={(event) => {
            event.preventDefault();
            void save();
          }}
        >
          <label className="admin-field">
            <span>Overview</span>
            <textarea
              required
              rows={5}
              value={overview}
              onChange={(event) => setOverview(event.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Features (one per line)</span>
            <textarea
              rows={5}
              value={featuresText}
              onChange={(event) => setFeaturesText(event.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Applications (one per line)</span>
            <textarea
              rows={5}
              value={applicationsText}
              onChange={(event) => setApplicationsText(event.target.value)}
            />
          </label>
          <div className="admin-field">
            <span>Specifications</span>
            <div className="admin-spec-table">
              {specifications.map((row, index) => (
                <div key={index} className="admin-spec-row">
                  <input
                    placeholder="Property"
                    value={row.property}
                    onChange={(event) => {
                      const next = [...specifications];
                      next[index] = { ...next[index], property: event.target.value };
                      setSpecifications(next);
                    }}
                  />
                  <input
                    placeholder="Value"
                    value={row.value}
                    onChange={(event) => {
                      const next = [...specifications];
                      next[index] = { ...next[index], value: event.target.value };
                      setSpecifications(next);
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() =>
                  setSpecifications([...specifications, { property: "", value: "" }])
                }
              >
                Add row
              </button>
            </div>
          </div>
          <div className="admin-form__actions">
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? "Saving…" : "Save details"}
            </button>
            <Link href={`/admin/products/${productId}`} className="btn btn--secondary">
              Back to product
            </Link>
          </div>
        </form>
        <aside className="admin-preview">
          <h2>Preview</h2>
          <h3>Overview</h3>
          <p>{overview || "—"}</p>
          <h3>Features</h3>
          <ul>
            {featuresText
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean)
              .map((item) => (
                <li key={item}>{item}</li>
              ))}
          </ul>
          <h3>Applications</h3>
          <ul>
            {applicationsText
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean)
              .map((item) => (
                <li key={item}>{item}</li>
              ))}
          </ul>
        </aside>
      </div>
    </AdminShell>
  );
}
