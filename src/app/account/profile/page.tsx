import type { Metadata } from "next";
import { getHomeContentUseCase } from "@/di/container";
import { AccountProfileView } from "@/presentation/components/account/AccountProfileView";

export const metadata: Metadata = {
  title: "Profile | Angel Starch & Food Inc.",
  description: "Manage your local Angel Starch profile and cart session.",
};

export default async function AccountProfilePage() {
  const site = await getHomeContentUseCase.execute();
  return <AccountProfileView site={site} />;
}
