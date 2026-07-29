import type {
  AdminStoredUser,
  AdminUser,
  CreateAdminUserInput,
  UpdateAdminUserInput,
} from "@/domain/entities/admin";

export interface AdminUserQuery {
  search?: string;
  role?: string;
  isActive?: boolean;
}

export interface AdminUserRepository {
  list(query?: AdminUserQuery): Promise<AdminUser[]>;
  getById(id: string): Promise<AdminUser | null>;
  getStoredByEmail(email: string): Promise<AdminStoredUser | null>;
  create(input: CreateAdminUserInput): Promise<AdminUser>;
  update(id: string, input: UpdateAdminUserInput): Promise<AdminUser>;
  deactivate(id: string): Promise<void>;
  ensureSuperAdminSeed(): Promise<AdminUser>;
}
