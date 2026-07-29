"use client";

import { useEffect, useState } from "react";
import type { AdminDashboardStats } from "@/domain/entities/admin";
import { getAdminDashboardStatsUseCase } from "@/di/container";

export function useAdminDashboardViewModel() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const next = await getAdminDashboardStatsUseCase.execute();
        if (!cancelled) setStats(next);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load stats.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}
