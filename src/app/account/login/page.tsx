import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { AccountLoginView } from "@/presentation/components/account/AccountLoginView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Sign In",
  description: "Sign in to your local Angel Starch account and cart session.",
  path: "/account/login",
  noIndex: true,
});
}

export default async function AccountLoginPage() {
  const site = await getHomeContentUseCase.execute();
  return <AccountLoginView site={site} />;
}
