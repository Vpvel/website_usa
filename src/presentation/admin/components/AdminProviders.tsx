import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/presentation/context/AdminAuthContext";

export function AdminProviders({ children }: { children: ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
