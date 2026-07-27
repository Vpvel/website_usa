import { getHomeContentUseCase } from "@/di/container";
import { HomePageView } from "@/presentation/components/home/HomePageView";

export default async function HomePage() {
  const content = await getHomeContentUseCase.execute();
  return <HomePageView content={content} />;
}
