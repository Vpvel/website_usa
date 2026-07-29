import type { AdminAboutContent } from "@/domain/entities/admin";
import type { AdminAboutRepository } from "@/domain/repositories/admin-about.repository";

export class GetAdminAboutContentUseCase {
  constructor(private readonly about: AdminAboutRepository) {}
  execute() {
    return this.about.get();
  }
}

export class UpdateAdminAboutContentUseCase {
  constructor(private readonly about: AdminAboutRepository) {}
  execute(content: AdminAboutContent) {
    if (!content.heroTitle.trim() || !content.brandName.trim()) {
      throw new Error("Brand name and hero title are required.");
    }
    return this.about.update(content);
  }
}
