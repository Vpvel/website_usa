import {
  getCertificationsUseCase,
  getHomeContentUseCase,
} from "@/di/container";
import { HomePageView } from "@/presentation/components/home/HomePageView";

export default async function HomePage() {
  const [content, certifications] = await Promise.all([
    getHomeContentUseCase.execute(),
    getCertificationsUseCase.execute(),
  ]);

  return <HomePageView content={content} certifications={certifications} />;
}
