"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminCategory, AdminProduct } from "@/domain/entities/admin";
import {
  createAdminProductUseCase,
  deleteAdminProductUseCase,
  getAdminProductByIdUseCase,
  getAdminProductDetailsUseCase,
  listAdminCategoriesUseCase,
  listAdminProductsUseCase,
  updateAdminProductUseCase,
} from "@/di/container";
import { toKebabCase } from "@/data/datasources/admin-storage";
import { notifyAdminContentChanged } from "@/data/datasources/admin-media.local";

export function useAdminProductsViewModel(editId?: string) {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [detailsMap, setDetailsMap] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    shortName: "",
    summary: "",
    pricePerKg: 1,
    minOrderKg: 25,
    packaging: "25 kg bags",
    categoryId: "",
    imageSrc: "/images/product_starch/tapioca_starch.webp",
    href: "",
    sourceUrl: "",
    isPublished: false,
    sortOrder: 0,
  });

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [productList, categoryList] = await Promise.all([
        listAdminProductsUseCase.execute(
          categoryFilter ? { categoryId: categoryFilter } : undefined,
        ),
        listAdminCategoriesUseCase.execute(),
      ]);
      let filtered = productList;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.shortName.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q),
        );
      }
      if (statusFilter === "published") {
        filtered = filtered.filter((item) => item.isPublished);
      } else if (statusFilter === "draft") {
        filtered = filtered.filter((item) => !item.isPublished);
      }
      setProducts(filtered);
      setCategories(categoryList);

      const map: Record<string, boolean> = {};
      await Promise.all(
        filtered.map(async (item) => {
          map[item.id] = Boolean(await getAdminProductDetailsUseCase.execute(item.id));
        }),
      );
      setDetailsMap(map);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, search, statusFilter]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!editId) return;
    void (async () => {
      const product = await getAdminProductByIdUseCase.execute(editId);
      if (!product) {
        setError("Product not found.");
        return;
      }
      setForm({
        id: product.id,
        name: product.name,
        shortName: product.shortName,
        summary: product.summary,
        pricePerKg: product.pricePerKg,
        minOrderKg: product.minOrderKg,
        packaging: product.packaging,
        categoryId: product.categoryId,
        imageSrc: product.imageSrc,
        href: product.href,
        sourceUrl: product.sourceUrl ?? "",
        isPublished: product.isPublished,
        sortOrder: product.sortOrder,
      });
    })();
  }, [editId]);

  async function createProduct() {
    setSaving(true);
    setError(null);
    try {
      const id = form.id.trim() || toKebabCase(form.name);
      await createAdminProductUseCase.execute({
        ...form,
        id,
        href: form.href || `/shop/product/${id}`,
        sourceUrl: form.sourceUrl || undefined,
      });
      await refresh();
      notifyAdminContentChanged();
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed.");
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function updateProduct() {
    if (!editId) return false;
    setSaving(true);
    setError(null);
    try {
      await updateAdminProductUseCase.execute(editId, {
        name: form.name,
        shortName: form.shortName,
        summary: form.summary,
        pricePerKg: form.pricePerKg,
        minOrderKg: form.minOrderKg,
        packaging: form.packaging,
        categoryId: form.categoryId,
        imageSrc: form.imageSrc,
        href: form.href,
        sourceUrl: form.sourceUrl || undefined,
        isPublished: form.isPublished,
        sortOrder: form.sortOrder,
      });
      await refresh();
      notifyAdminContentChanged();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function removeProduct(id: string) {
    try {
      await deleteAdminProductUseCase.execute(id);
      await refresh();
      notifyAdminContentChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  return {
    products,
    categories,
    detailsMap,
    categoryFilter,
    statusFilter,
    search,
    loading,
    saving,
    error,
    form,
    setCategoryFilter,
    setStatusFilter,
    setSearch,
    setForm,
    createProduct,
    updateProduct,
    removeProduct,
  };
}
