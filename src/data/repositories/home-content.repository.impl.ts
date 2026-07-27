import type { HomeContent } from "@/domain/entities/home-content";
import type { HomeContentRepository } from "@/domain/repositories/home-content.repository";
import { homeContentLocal } from "@/data/datasources/home-content.local";

export class HomeContentRepositoryImpl implements HomeContentRepository {
  async getHomeContent(): Promise<HomeContent> {
    return homeContentLocal;
  }
}
