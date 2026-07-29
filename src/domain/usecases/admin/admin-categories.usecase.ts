import type {
  CreateAdminCategoryInput,
  UpdateAdminCategoryInput,
} from "@/domain/entities/admin";
import type { AdminCategoryRepository } from "@/domain/repositories/admin-category.repository";

export class ListAdminCategoriesUseCase {
  constructor(private readonly categories: AdminCategoryRepository) {}
  execute() {
    return this.categories.list();
  }
}

export class GetAdminCategoryByIdUseCase {
  constructor(private readonly categories: AdminCategoryRepository) {}
  execute(id: string) {
    return this.categories.getById(id);
  }
}

export class CreateAdminCategoryUseCase {
  constructor(private readonly categories: AdminCategoryRepository) {}
  execute(input: CreateAdminCategoryInput) {
    if (!input.id.trim() || !input.title.trim() || !input.description.trim()) {
      throw new Error("Slug, title, and description are required.");
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.id)) {
      throw new Error("Slug must be kebab-case (e.g. native-starch).");
    }
    return this.categories.create(input);
  }
}

export class UpdateAdminCategoryUseCase {
  constructor(private readonly categories: AdminCategoryRepository) {}
  execute(id: string, input: UpdateAdminCategoryInput) {
    return this.categories.update(id, input);
  }
}

export class DeleteAdminCategoryUseCase {
  constructor(private readonly categories: AdminCategoryRepository) {}
  execute(id: string) {
    return this.categories.delete(id);
  }
}

export class GetCategoryProductCountUseCase {
  constructor(private readonly categories: AdminCategoryRepository) {}
  execute(id: string) {
    return this.categories.productCount(id);
  }
}
