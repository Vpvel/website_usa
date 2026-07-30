import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminProviders } from "@/presentation/admin/components/AdminProviders";
import { noIndexMetadata } from "@/presentation/seo/build-page-metadata";

export const metadata: Metadata = {
  ...noIndexMetadata,
  title: {
    default: "Admin | Angel Starch",
    template: "%s | Angel Starch Admin",
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminProviders>{children}</AdminProviders>;
}
