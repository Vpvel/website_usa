import type { AboutContent } from "../entities/about-content";
import type { AboutRepository } from "../repositories/about.repository";

export class GetAboutContentUseCase {
  constructor(private readonly repository: AboutRepository) {}

  execute(): Promise<AboutContent> {
    return this.repository.getAboutContent();
  }
}
