import type { ApplicationDetail } from "../entities/application-detail";

export interface ApplicationRepository {
  getBySlug(slug: string): Promise<ApplicationDetail | null>;
  listSummaries(): Promise<Array<{ slug: string; title: string; href: string }>>;
}
