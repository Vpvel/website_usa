import type {
  AdminCategory,
  CreateAdminCategoryInput,
  UpdateAdminCategoryInput,
} from "@/domain/entities/admin";

export interface AdminCategoryRepository {
  list(): Promise<AdminCategory[]>;
  getById(id: string): Promise<AdminCategory | null>;
  create(input: CreateAdminCategoryInput): Promise<AdminCategory>;
  update(id: string, input: UpdateAdminCategoryInput): Promise<AdminCategory>;
  delete(id: string): Promise<void>;
  productCount(id: string): Promise<number>;
}
