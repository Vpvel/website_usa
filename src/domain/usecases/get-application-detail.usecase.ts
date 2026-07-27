import type { ApplicationDetail } from "../entities/application-detail";
import type { ApplicationRepository } from "../repositories/application.repository";

export class GetApplicationDetailUseCase {
  constructor(private readonly repository: ApplicationRepository) {}

  execute(slug: string): Promise<ApplicationDetail | null> {
    return this.repository.getBySlug(slug);
  }
}
