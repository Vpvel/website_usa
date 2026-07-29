"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AdminSession, AdminUser } from "@/domain/entities/admin";
import {
  adminBootstrapUseCase,
  adminLoginUseCase,
  ensureSuperAdminSeedUseCase,
  getAdminUserByIdUseCase,
} from "@/di/container";
import {
  ADMIN_SESSION_KEY,
  readJson,
  writeJson,
} from "@/data/datasources/admin-storage";

interface AdminAuthContextValue {
  admin: AdminUser | null;
  hydrated: boolean;
  login: (input: {
    email: string;
    password: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function hydrate() {
      await ensureSuperAdminSeedUseCase.execute();
      await adminBootstrapUseCase.execute();
      const session = readJson<AdminSession | null>(ADMIN_SESSION_KEY, null);
      if (session) {
        const user = await getAdminUserByIdUseCase.execute(session.userId);
        if (
          user &&
          user.isActive &&
          (user.role === "super_admin" || user.role === "admin")
        ) {
          setAdmin(user);
        } else {
          writeJson<AdminSession | null>(ADMIN_SESSION_KEY, null);
        }
      }
      setHydrated(true);
    }

    void hydrate();
  }, []);

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      const result = await adminLoginUseCase.execute(input);
      if (!result.ok) return { ok: false as const, error: result.error };
      writeJson(ADMIN_SESSION_KEY, result.session);
      setAdmin(result.user);
      return { ok: true as const };
    },
    [],
  );

  const logout = useCallback(() => {
    writeJson<AdminSession | null>(ADMIN_SESSION_KEY, null);
    setAdmin(null);
  }, []);

  const refreshAdmin = useCallback(async () => {
    const session = readJson<AdminSession | null>(ADMIN_SESSION_KEY, null);
    if (!session) {
      setAdmin(null);
      return;
    }
    const user = await getAdminUserByIdUseCase.execute(session.userId);
    if (
      user &&
      user.isActive &&
      (user.role === "super_admin" || user.role === "admin")
    ) {
      setAdmin(user);
      return;
    }
    writeJson<AdminSession | null>(ADMIN_SESSION_KEY, null);
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({ admin, hydrated, login, logout, refreshAdmin }),
    [admin, hydrated, login, logout, refreshAdmin],
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
