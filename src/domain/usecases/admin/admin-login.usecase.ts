import type { AdminSession, AdminUser } from "@/domain/entities/admin";
import type { AdminUserRepository } from "@/domain/repositories/admin-user.repository";
import { hashPassword } from "@/domain/utils/password";

const ADMIN_ROLES = new Set(["super_admin", "admin"]);

export class AdminLoginUseCase {
  constructor(private readonly users: AdminUserRepository) {}

  async execute(input: {
    email: string;
    password: string;
  }): Promise<{ ok: true; user: AdminUser; session: AdminSession } | { ok: false; error: string }> {
    await this.users.ensureSuperAdminSeed();
    const stored = await this.users.getStoredByEmail(input.email);
    if (!stored || stored.passwordHash !== hashPassword(input.password)) {
      return { ok: false, error: "Invalid email or password." };
    }
    if (!stored.isActive) {
      return { ok: false, error: "This account is inactive." };
    }
    if (!ADMIN_ROLES.has(stored.role)) {
      return {
        ok: false,
        error: "This account does not have admin access. Use Super Login credentials.",
      };
    }

    const session: AdminSession = {
      userId: stored.id,
      email: stored.email,
      role: stored.role,
      loggedInAt: new Date().toISOString(),
    };

    const { passwordHash: _passwordHash, ...user } = stored;
    return { ok: true, user, session };
  }
}
