import type {
  AdminUserQuery,
  AdminUserRepository,
} from "@/domain/repositories/admin-user.repository";
import type {
  CreateAdminUserInput,
  UpdateAdminUserInput,
} from "@/domain/entities/admin";

export class ListAdminUsersUseCase {
  constructor(private readonly users: AdminUserRepository) {}
  execute(query?: AdminUserQuery) {
    return this.users.list(query);
  }
}

export class GetAdminUserByIdUseCase {
  constructor(private readonly users: AdminUserRepository) {}
  execute(id: string) {
    return this.users.getById(id);
  }
}

export class CreateAdminUserUseCase {
  constructor(private readonly users: AdminUserRepository) {}
  execute(input: CreateAdminUserInput) {
    if (!input.name.trim() || !input.email.trim() || input.password.trim().length < 6) {
      throw new Error(
        "Name, email, and a password of at least 6 characters are required.",
      );
    }
    return this.users.create(input);
  }
}

export class UpdateAdminUserUseCase {
  constructor(private readonly users: AdminUserRepository) {}
  execute(id: string, input: UpdateAdminUserInput) {
    if (input.password !== undefined && input.password.trim().length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }
    return this.users.update(id, input);
  }
}

export class DeactivateAdminUserUseCase {
  constructor(private readonly users: AdminUserRepository) {}
  execute(id: string) {
    return this.users.deactivate(id);
  }
}
