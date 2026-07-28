import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { AccountRegisterView } from "@/presentation/components/account/AccountRegisterView";

export const metadata: Metadata = {
  title: "Create Account | Angel Starch & Food Inc.",
  description: "Create a local Angel Starch account for profile and cart.",
};

export default async function AccountRegisterPage() {
  const site = await getHomeContentUseCase.execute();
  return <AccountRegisterView site={site} />;
}
