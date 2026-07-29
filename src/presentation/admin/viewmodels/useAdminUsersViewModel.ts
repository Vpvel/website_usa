"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminRole, AdminUser } from "@/domain/entities/admin";
import {
  createAdminUserUseCase,
  deactivateAdminUserUseCase,
  getAdminUserByIdUseCase,
  listAdminUsersUseCase,
  updateAdminUserUseCase,
} from "@/di/container";
import { useAdminAuth } from "@/presentation/context/AdminAuthContext";

export function useAdminUsersViewModel(editId?: string) {
  const { admin } = useAdminAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [current, setCurrent] = useState<AdminUser | null>(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
    role: "customer" as AdminRole,
    isActive: true,
  });

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await listAdminUsersUseCase.execute({
        search: query || undefined,
        role: roleFilter || undefined,
      });
      setUsers(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [query, roleFilter]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!editId) return;
    void (async () => {
      const user = await getAdminUserByIdUseCase.execute(editId);
      if (!user) {
        setError("User not found.");
        return;
      }
      setCurrent(user);
      setForm({
        name: user.name,
        email: user.email,
        password: "",
        company: user.company,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
      });
    })();
  }, [editId]);

  function canManageRole(role: AdminRole) {
    if (!admin) return false;
    if (admin.role === "super_admin") return true;
    return role !== "super_admin";
  }

  async function createUser() {
    setSaving(true);
    setError(null);
    setFieldErrors({});
    try {
      if (!canManageRole(form.role)) {
        throw new Error("You cannot create this role.");
      }
      await createAdminUserUseCase.execute(form);
      await refresh();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function updateUser() {
    if (!editId) return false;
    setSaving(true);
    setError(null);
    try {
      if (!canManageRole(form.role)) {
        throw new Error("You cannot assign this role.");
      }
      await updateAdminUserUseCase.execute(editId, {
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        role: form.role,
        isActive: form.isActive,
        password: form.password || undefined,
      });
      await refresh();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function deactivateUser(id: string) {
    try {
      await deactivateAdminUserUseCase.execute(id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deactivate failed.");
    }
  }

  return {
    users,
    current,
    query,
    roleFilter,
    loading,
    saving,
    error,
    fieldErrors,
    form,
    setQuery,
    setRoleFilter,
    setForm,
    createUser,
    updateUser,
    deactivateUser,
    canManageRole,
  };
}
