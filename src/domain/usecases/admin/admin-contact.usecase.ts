import type { AdminContactContent } from "@/domain/entities/admin";
import type { AdminContactRepository } from "@/domain/repositories/admin-contact.repository";

export class GetAdminContactContentUseCase {
  constructor(private readonly contact: AdminContactRepository) {}
  execute() {
    return this.contact.get();
  }
}

export class UpdateAdminContactContentUseCase {
  constructor(private readonly contact: AdminContactRepository) {}
  execute(content: AdminContactContent) {
    if (!content.heroTitle.trim()) {
      throw new Error("Hero title is required.");
    }
    if (!content.offices.length) {
      throw new Error("At least one office is required.");
    }
    return this.contact.update(content);
  }
}
