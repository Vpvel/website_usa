import type { AdminUserRepository } from "@/domain/repositories/admin-user.repository";

export class EnsureSuperAdminSeedUseCase {
  constructor(private readonly users: AdminUserRepository) {}

  execute() {
    return this.users.ensureSuperAdminSeed();
  }
}
