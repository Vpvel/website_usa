import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { AccountRegisterView } from "@/presentation/components/account/AccountRegisterView";
import { buildManagedPageMetadata } from "@/presentation/seo/resolve-managed-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildManagedPageMetadata({
  title: "Create Account",
  description: "Create a local Angel Starch account to save cart and order details.",
  path: "/account/register",
  noIndex: true,
});
}

export default async function AccountRegisterPage() {
  const site = await getHomeContentUseCase.execute();
  return <AccountRegisterView site={site} />;
}
