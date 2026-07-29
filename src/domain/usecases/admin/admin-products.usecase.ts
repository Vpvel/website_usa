import type {
  AdminProductDetails,
  CreateAdminProductInput,
  UpdateAdminProductInput,
} from "@/domain/entities/admin";
import type { AdminProductRepository } from "@/domain/repositories/admin-product.repository";

export class ListAdminProductsUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute(filter?: { categoryId?: string }) {
    return this.products.list(filter);
  }
}

export class GetAdminProductByIdUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute(id: string) {
    return this.products.getById(id);
  }
}

export class CreateAdminProductUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute(input: CreateAdminProductInput) {
    if (
      !input.id.trim() ||
      !input.name.trim() ||
      !input.shortName.trim() ||
      !input.summary.trim() ||
      !input.categoryId ||
      !input.imageSrc.trim() ||
      !input.packaging.trim()
    ) {
      throw new Error("Required product fields are missing.");
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.id)) {
      throw new Error("Slug must be kebab-case.");
    }
    if (!(input.pricePerKg > 0) || !(input.minOrderKg >= 1)) {
      throw new Error("Price must be > 0 and minimum order must be ≥ 1 kg.");
    }
    return this.products.create(input);
  }
}

export class UpdateAdminProductUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute(id: string, input: UpdateAdminProductInput) {
    return this.products.update(id, input);
  }
}

export class DeleteAdminProductUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute(id: string) {
    return this.products.delete(id);
  }
}

export class GetAdminProductDetailsUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute(productId: string) {
    return this.products.getDetails(productId);
  }
}

export class UpsertAdminProductDetailsUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute(details: AdminProductDetails) {
    if (!details.overview.trim()) {
      throw new Error("Overview is required.");
    }
    return this.products.upsertDetails(details);
  }
}

export class ClearAdminProductDetailsUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute(productId: string) {
    return this.products.clearDetails(productId);
  }
}

export class CountProductsMissingDetailsUseCase {
  constructor(private readonly products: AdminProductRepository) {}
  execute() {
    return this.products.countMissingDetails();
  }
}
