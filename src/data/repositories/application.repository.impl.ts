import type { ApplicationDetail } from "@/domain/entities/application-detail";
import type { ApplicationRepository } from "@/domain/repositories/application.repository";
import { applicationDetailsLocal } from "@/data/datasources/application-details.local";

export class ApplicationRepositoryImpl implements ApplicationRepository {
  async getBySlug(slug: string): Promise<ApplicationDetail | null> {
    return applicationDetailsLocal.find((item) => item.slug === slug) ?? null;
  }

  async listSummaries() {
    return applicationDetailsLocal.map((item) => ({
      slug: item.slug,
      title: item.title,
      href: `/applications/${item.slug}`,
    }));
  }
}
