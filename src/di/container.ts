import { AboutRepositoryImpl } from "@/data/repositories/about.repository.impl";
import { ApplicationRepositoryImpl } from "@/data/repositories/application.repository.impl";
import { ContactRepositoryImpl } from "@/data/repositories/contact.repository.impl";
import { HomeContentRepositoryImpl } from "@/data/repositories/home-content.repository.impl";
import { ProductRepositoryImpl } from "@/data/repositories/product.repository.impl";
import { ShopRepositoryImpl } from "@/data/repositories/shop.repository.impl";
import { AdminCategoryRepositoryImpl } from "@/data/repositories/admin-category.repository.impl";
import { AdminHomeRepositoryImpl } from "@/data/repositories/admin-home.repository.impl";
import { AdminAboutRepositoryImpl } from "@/data/repositories/admin-about.repository.impl";
import { AdminContactRepositoryImpl } from "@/data/repositories/admin-contact.repository.impl";
import { AdminProductRepositoryImpl } from "@/data/repositories/admin-product.repository.impl";
import { AdminUserRepositoryImpl } from "@/data/repositories/admin-user.repository.impl";
import { CertificationRepositoryImpl } from "@/data/repositories/certification.repository.impl";
import { GetAboutContentUseCase } from "@/domain/usecases/get-about-content.usecase";
import { GetApplicationDetailUseCase } from "@/domain/usecases/get-application-detail.usecase";
import { GetContactContentUseCase } from "@/domain/usecases/get-contact-content.usecase";
import { GetHomeContentUseCase } from "@/domain/usecases/get-home-content.usecase";
import { GetProductDetailUseCase } from "@/domain/usecases/get-product-detail.usecase";
import { GetShopCatalogUseCase } from "@/domain/usecases/get-shop-catalog.usecase";
import { GetShopProductUseCase } from "@/domain/usecases/get-shop-product.usecase";
import { GetCertificationsUseCase } from "@/domain/usecases/get-certifications.usecase";
import { AdminLoginUseCase } from "@/domain/usecases/admin/admin-login.usecase";
import { EnsureSuperAdminSeedUseCase } from "@/domain/usecases/admin/ensure-super-admin-seed.usecase";
import {
  CreateAdminUserUseCase,
  DeactivateAdminUserUseCase,
  GetAdminUserByIdUseCase,
  ListAdminUsersUseCase,
  UpdateAdminUserUseCase,
} from "@/domain/usecases/admin/admin-users.usecase";
import {
  CreateAdminCategoryUseCase,
  DeleteAdminCategoryUseCase,
  GetAdminCategoryByIdUseCase,
  GetCategoryProductCountUseCase,
  ListAdminCategoriesUseCase,
  UpdateAdminCategoryUseCase,
} from "@/domain/usecases/admin/admin-categories.usecase";
import {
  ClearAdminProductDetailsUseCase,
  CountProductsMissingDetailsUseCase,
  CreateAdminProductUseCase,
  DeleteAdminProductUseCase,
  GetAdminProductByIdUseCase,
  GetAdminProductDetailsUseCase,
  ListAdminProductsUseCase,
  UpdateAdminProductUseCase,
  UpsertAdminProductDetailsUseCase,
} from "@/domain/usecases/admin/admin-products.usecase";
import {
  GetAdminHomeContentUseCase,
  UpdateAdminHomeContentUseCase,
} from "@/domain/usecases/admin/admin-home.usecase";
import {
  GetAdminAboutContentUseCase,
  UpdateAdminAboutContentUseCase,
} from "@/domain/usecases/admin/admin-about.usecase";
import {
  GetAdminContactContentUseCase,
  UpdateAdminContactContentUseCase,
} from "@/domain/usecases/admin/admin-contact.usecase";
import {
  AdminBootstrapUseCase,
  GetAdminDashboardStatsUseCase,
} from "@/domain/usecases/admin/admin-dashboard.usecase";

const homeContentRepository = new HomeContentRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const applicationRepository = new ApplicationRepositoryImpl();
const shopRepository = new ShopRepositoryImpl();
const aboutRepository = new AboutRepositoryImpl();
const contactRepository = new ContactRepositoryImpl();
const certificationRepository = new CertificationRepositoryImpl();
const adminUserRepository = new AdminUserRepositoryImpl();
const adminCategoryRepository = new AdminCategoryRepositoryImpl();
const adminProductRepository = new AdminProductRepositoryImpl();
const adminHomeRepository = new AdminHomeRepositoryImpl();
const adminAboutRepository = new AdminAboutRepositoryImpl();
const adminContactRepository = new AdminContactRepositoryImpl();

export const getHomeContentUseCase = new GetHomeContentUseCase(
  homeContentRepository,
);

export const getProductDetailUseCase = new GetProductDetailUseCase(
  productRepository,
);

export const getApplicationDetailUseCase = new GetApplicationDetailUseCase(
  applicationRepository,
);

export const getShopCatalogUseCase = new GetShopCatalogUseCase(shopRepository);

export const getShopProductUseCase = new GetShopProductUseCase(shopRepository);

export const getAboutContentUseCase = new GetAboutContentUseCase(
  aboutRepository,
);

export const getContactContentUseCase = new GetContactContentUseCase(
  contactRepository,
);

export const getCertificationsUseCase = new GetCertificationsUseCase(
  certificationRepository,
);

export const adminLoginUseCase = new AdminLoginUseCase(adminUserRepository);
export const ensureSuperAdminSeedUseCase = new EnsureSuperAdminSeedUseCase(
  adminUserRepository,
);
export const listAdminUsersUseCase = new ListAdminUsersUseCase(
  adminUserRepository,
);
export const getAdminUserByIdUseCase = new GetAdminUserByIdUseCase(
  adminUserRepository,
);
export const createAdminUserUseCase = new CreateAdminUserUseCase(
  adminUserRepository,
);
export const updateAdminUserUseCase = new UpdateAdminUserUseCase(
  adminUserRepository,
);
export const deactivateAdminUserUseCase = new DeactivateAdminUserUseCase(
  adminUserRepository,
);

export const listAdminCategoriesUseCase = new ListAdminCategoriesUseCase(
  adminCategoryRepository,
);
export const getAdminCategoryByIdUseCase = new GetAdminCategoryByIdUseCase(
  adminCategoryRepository,
);
export const createAdminCategoryUseCase = new CreateAdminCategoryUseCase(
  adminCategoryRepository,
);
export const updateAdminCategoryUseCase = new UpdateAdminCategoryUseCase(
  adminCategoryRepository,
);
export const deleteAdminCategoryUseCase = new DeleteAdminCategoryUseCase(
  adminCategoryRepository,
);
export const getCategoryProductCountUseCase = new GetCategoryProductCountUseCase(
  adminCategoryRepository,
);

export const listAdminProductsUseCase = new ListAdminProductsUseCase(
  adminProductRepository,
);
export const getAdminProductByIdUseCase = new GetAdminProductByIdUseCase(
  adminProductRepository,
);
export const createAdminProductUseCase = new CreateAdminProductUseCase(
  adminProductRepository,
);
export const updateAdminProductUseCase = new UpdateAdminProductUseCase(
  adminProductRepository,
);
export const deleteAdminProductUseCase = new DeleteAdminProductUseCase(
  adminProductRepository,
);
export const getAdminProductDetailsUseCase = new GetAdminProductDetailsUseCase(
  adminProductRepository,
);
export const upsertAdminProductDetailsUseCase =
  new UpsertAdminProductDetailsUseCase(adminProductRepository);
export const clearAdminProductDetailsUseCase =
  new ClearAdminProductDetailsUseCase(adminProductRepository);
export const countProductsMissingDetailsUseCase =
  new CountProductsMissingDetailsUseCase(adminProductRepository);

export const getAdminHomeContentUseCase = new GetAdminHomeContentUseCase(
  adminHomeRepository,
);
export const updateAdminHomeContentUseCase = new UpdateAdminHomeContentUseCase(
  adminHomeRepository,
);

export const getAdminAboutContentUseCase = new GetAdminAboutContentUseCase(
  adminAboutRepository,
);
export const updateAdminAboutContentUseCase = new UpdateAdminAboutContentUseCase(
  adminAboutRepository,
);

export const getAdminContactContentUseCase = new GetAdminContactContentUseCase(
  adminContactRepository,
);
export const updateAdminContactContentUseCase =
  new UpdateAdminContactContentUseCase(adminContactRepository);

export const getAdminDashboardStatsUseCase = new GetAdminDashboardStatsUseCase(
  adminUserRepository,
  adminCategoryRepository,
  adminProductRepository,
);

export const adminBootstrapUseCase = new AdminBootstrapUseCase(
  adminUserRepository,
  adminCategoryRepository,
  adminProductRepository,
  adminHomeRepository,
  adminAboutRepository,
  adminContactRepository,
);
