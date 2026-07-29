import type {
  AdminProduct,
  AdminProductDetails,
  CreateAdminProductInput,
  UpdateAdminProductInput,
} from "@/domain/entities/admin";

export interface AdminProductRepository {
  list(filter?: { categoryId?: string }): Promise<AdminProduct[]>;
  getById(id: string): Promise<AdminProduct | null>;
  create(input: CreateAdminProductInput): Promise<AdminProduct>;
  update(id: string, input: UpdateAdminProductInput): Promise<AdminProduct>;
  delete(id: string): Promise<void>;
  getDetails(productId: string): Promise<AdminProductDetails | null>;
  upsertDetails(details: AdminProductDetails): Promise<AdminProductDetails>;
  clearDetails(productId: string): Promise<void>;
  countMissingDetails(): Promise<number>;
}
