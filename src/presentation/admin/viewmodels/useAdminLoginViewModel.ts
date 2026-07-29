"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminAuth } from "@/presentation/context/AdminAuthContext";

export function useAdminLoginViewModel() {
  const { admin, hydrated, login } = useAdminAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (hydrated && admin) {
      const next = searchParams.get("next");
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
    }
  }, [admin, hydrated, router, searchParams]);

  async function submit() {
    setError(null);
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    void rememberMe;
    const next = searchParams.get("next");
    router.replace(next && next.startsWith("/admin") ? next : "/admin");
  }

  return {
    email,
    password,
    rememberMe,
    loading,
    error,
    fieldErrors,
    setEmail,
    setPassword,
    setRememberMe,
    login: submit,
    clearError: () => setError(null),
  };
}
