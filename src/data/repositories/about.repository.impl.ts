import type { AboutContent } from "@/domain/entities/about-content";
import type { AboutRepository } from "@/domain/repositories/about.repository";
import { aboutContentLocal } from "@/data/datasources/about-content.local";

export class AboutRepositoryImpl implements AboutRepository {
  async getAboutContent(): Promise<AboutContent> {
    return aboutContentLocal;
  }
}
