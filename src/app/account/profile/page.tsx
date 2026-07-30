import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { AccountProfileView } from "@/presentation/components/account/AccountProfileView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Account Profile",
  description: "Manage your Angel Starch account profile and saved session details.",
  path: "/account/profile",
  noIndex: true,
});
}

export default async function AccountProfilePage() {
  const site = await getHomeContentUseCase.execute();
  return <AccountProfileView site={site} />;
}
