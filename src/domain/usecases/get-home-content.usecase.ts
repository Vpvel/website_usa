import type { HomeContent } from "../entities/home-content";
import type { HomeContentRepository } from "../repositories/home-content.repository";

export class GetHomeContentUseCase {
  constructor(private readonly repository: HomeContentRepository) {}

  execute(): Promise<HomeContent> {
    return this.repository.getHomeContent();
  }
}
