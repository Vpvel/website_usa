"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminCategory } from "@/domain/entities/admin";
import type { ShopProductSpec } from "@/domain/entities/shop-product";
import {
  createAdminCategoryUseCase,
  deleteAdminCategoryUseCase,
  getAdminCategoryByIdUseCase,
  getCategoryProductCountUseCase,
  listAdminCategoriesUseCase,
  updateAdminCategoryUseCase,
} from "@/di/container";
import { toKebabCase } from "@/data/datasources/admin-storage";
import { notifyAdminContentChanged } from "@/data/datasources/admin-media.local";

export function useAdminCategoriesViewModel(editId?: string) {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    overview: "",
    featuresText: "",
    applicationsText: "",
    specifications: [] as ShopProductSpec[],
    sortOrder: 0,
    isPublished: true,
  });

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const list = await listAdminCategoriesUseCase.execute();
      setCategories(list);
      const nextCounts: Record<string, number> = {};
      await Promise.all(
        list.map(async (item) => {
          nextCounts[item.id] = await getCategoryProductCountUseCase.execute(item.id);
        }),
      );
      setCounts(nextCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!editId) return;
    void (async () => {
      const category = await getAdminCategoryByIdUseCase.execute(editId);
      if (!category) {
        setError("Category not found.");
        return;
      }
      setForm({
        id: category.id,
        title: category.title,
        description: category.description,
        overview: category.overview ?? "",
        featuresText: (category.features ?? []).join("\n"),
        applicationsText: (category.applications ?? []).join("\n"),
        specifications: category.specifications ?? [],
        sortOrder: category.sortOrder,
        isPublished: category.isPublished,
      });
    })();
  }, [editId]);

  function linesToList(value: string) {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  async function createCategory() {
    setSaving(true);
    setError(null);
    try {
      const id = form.id.trim() || toKebabCase(form.title);
      await createAdminCategoryUseCase.execute({
        id,
        title: form.title,
        description: form.description,
        overview: form.overview,
        features: linesToList(form.featuresText),
        applications: linesToList(form.applicationsText),
        specifications: form.specifications,
        sortOrder: form.sortOrder,
        isPublished: form.isPublished,
      });
      await refresh();
      notifyAdminContentChanged();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function updateCategory() {
    if (!editId) return false;
    setSaving(true);
    setError(null);
    try {
      await updateAdminCategoryUseCase.execute(editId, {
        title: form.title,
        description: form.description,
        overview: form.overview,
        features: linesToList(form.featuresText),
        applications: linesToList(form.applicationsText),
        specifications: form.specifications,
        sortOrder: form.sortOrder,
        isPublished: form.isPublished,
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

  async function removeCategory(id: string) {
    try {
      await deleteAdminCategoryUseCase.execute(id);
      await refresh();
      notifyAdminContentChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  return {
    categories,
    counts,
    loading,
    saving,
    error,
    form,
    setForm,
    createCategory,
    updateCategory,
    removeCategory,
  };
}
