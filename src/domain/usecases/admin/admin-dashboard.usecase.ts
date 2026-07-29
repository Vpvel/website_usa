import type {
  AdminCategoryRepository,
} from "@/domain/repositories/admin-category.repository";
import type { AdminHomeRepository } from "@/domain/repositories/admin-home.repository";
import type { AdminAboutRepository } from "@/domain/repositories/admin-about.repository";
import type { AdminContactRepository } from "@/domain/repositories/admin-contact.repository";
import type { AdminProductRepository } from "@/domain/repositories/admin-product.repository";
import type { AdminUserRepository } from "@/domain/repositories/admin-user.repository";
import type { AdminDashboardStats } from "@/domain/entities/admin";

export class GetAdminDashboardStatsUseCase {
  constructor(
    private readonly users: AdminUserRepository,
    private readonly categories: AdminCategoryRepository,
    private readonly products: AdminProductRepository,
  ) {}

  async execute(): Promise<AdminDashboardStats> {
    const [userList, categoryList, productList, missingDetails] =
      await Promise.all([
        this.users.list(),
        this.categories.list(),
        this.products.list(),
        this.products.countMissingDetails(),
      ]);

    return {
      totalUsers: userList.length,
      categoriesCount: categoryList.length,
      productsPublished: productList.filter((item) => item.isPublished).length,
      productsDraft: productList.filter((item) => !item.isPublished).length,
      productsMissingDetails: missingDetails,
    };
  }
}

export class AdminBootstrapUseCase {
  constructor(
    private readonly users: AdminUserRepository,
    private readonly categories: AdminCategoryRepository,
    private readonly products: AdminProductRepository,
    private readonly home: AdminHomeRepository,
    private readonly about: AdminAboutRepository,
    private readonly contact: AdminContactRepository,
  ) {}

  async execute() {
    await Promise.all([
      this.users.ensureSuperAdminSeed(),
      this.categories.list(),
      this.products.list(),
      this.home.get(),
      this.about.get(),
      this.contact.get(),
    ]);
  }
}
