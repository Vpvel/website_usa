"use client";

import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/presentation/context/AdminAuthContext";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
