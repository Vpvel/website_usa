import type { HomeContent } from "../entities/home-content";

export interface HomeContentRepository {
  getHomeContent(): Promise<HomeContent>;
}
