import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { AccountLoginView } from "@/presentation/components/account/AccountLoginView";

export const metadata: Metadata = {
  title: "Sign In | Angel Starch & Food Inc.",
  description: "Sign in to your local Angel Starch account and cart session.",
};

export default async function AccountLoginPage() {
  const site = await getHomeContentUseCase.execute();
  return <AccountLoginView site={site} />;
}
