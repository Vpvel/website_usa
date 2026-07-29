import type { AdminHomeContent } from "@/domain/entities/admin";
import type { AdminHomeRepository } from "@/domain/repositories/admin-home.repository";

export class GetAdminHomeContentUseCase {
  constructor(private readonly home: AdminHomeRepository) {}
  execute() {
    return this.home.get();
  }
}

export class UpdateAdminHomeContentUseCase {
  constructor(private readonly home: AdminHomeRepository) {}
  execute(content: AdminHomeContent) {
    if (!content.brandName.trim() || !content.tagline.trim()) {
      throw new Error("Brand name and tagline are required.");
    }
    return this.home.update(content);
  }
}
