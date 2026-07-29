import type {
  AdminStoredUser,
  AdminUser,
  CreateAdminUserInput,
  UpdateAdminUserInput,
} from "@/domain/entities/admin";
import type {
  AdminUserQuery,
  AdminUserRepository,
} from "@/domain/repositories/admin-user.repository";
import { buildSeedSuperAdmin } from "@/data/datasources/admin-seed.local";
import {
  ADMIN_USERS_KEY,
  createId,
  hashPassword,
  nowIso,
  readJson,
  writeJson,
} from "@/data/datasources/admin-storage";

function toPublic(user: AdminStoredUser): AdminUser {
  const { passwordHash: _passwordHash, ...rest } = user;
  return rest;
}

function normalizeStored(raw: unknown[]): AdminStoredUser[] {
  return raw.map((item) => {
    const user = item as Partial<AdminStoredUser> & { passwordHash: string };
    return {
      id: user.id ?? createId("user"),
      name: user.name ?? "",
      email: (user.email ?? "").toLowerCase(),
      company: user.company ?? "",
      phone: user.phone ?? "",
      role: user.role ?? "customer",
      isActive: user.isActive ?? true,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt ?? nowIso(),
      updatedAt: user.updatedAt ?? nowIso(),
    };
  });
}

function readUsers(): AdminStoredUser[] {
  return normalizeStored(readJson<unknown[]>(ADMIN_USERS_KEY, []));
}

function writeUsers(users: AdminStoredUser[]) {
  writeJson(ADMIN_USERS_KEY, users);
}

export class AdminUserRepositoryImpl implements AdminUserRepository {
  async ensureSuperAdminSeed(): Promise<AdminUser> {
    const users = readUsers();
    const existing = users.find(
      (item) =>
        item.email === "superadmin@angelstarch.com" ||
        item.role === "super_admin",
    );
    if (existing) {
      if (!existing.role || existing.role !== "super_admin") {
        existing.role = "super_admin";
        existing.isActive = true;
        existing.updatedAt = nowIso();
        writeUsers(users);
      }
      return toPublic(existing);
    }

    const seed = buildSeedSuperAdmin();
    writeUsers([...users, seed]);
    return toPublic(seed);
  }

  async list(query?: AdminUserQuery): Promise<AdminUser[]> {
    await this.ensureSuperAdminSeed();
    let users = readUsers().map(toPublic);

    if (query?.search) {
      const q = query.search.trim().toLowerCase();
      users = users.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q),
      );
    }
    if (query?.role) {
      users = users.filter((item) => item.role === query.role);
    }
    if (typeof query?.isActive === "boolean") {
      users = users.filter((item) => item.isActive === query.isActive);
    }

    return users.sort((a, b) => a.name.localeCompare(b.name));
  }

  async getById(id: string): Promise<AdminUser | null> {
    await this.ensureSuperAdminSeed();
    const match = readUsers().find((item) => item.id === id);
    return match ? toPublic(match) : null;
  }

  async getStoredByEmail(email: string): Promise<AdminStoredUser | null> {
    await this.ensureSuperAdminSeed();
    const normalized = email.trim().toLowerCase();
    return readUsers().find((item) => item.email === normalized) ?? null;
  }

  async create(input: CreateAdminUserInput): Promise<AdminUser> {
    await this.ensureSuperAdminSeed();
    const users = readUsers();
    const email = input.email.trim().toLowerCase();

    if (users.some((item) => item.email === email)) {
      throw new Error("An account with this email already exists.");
    }

    const now = nowIso();
    const stored: AdminStoredUser = {
      id: createId("user"),
      name: input.name.trim(),
      email,
      company: input.company?.trim() ?? "",
      phone: input.phone?.trim() ?? "",
      role: input.role,
      isActive: input.isActive ?? true,
      passwordHash: hashPassword(input.password),
      createdAt: now,
      updatedAt: now,
    };

    writeUsers([...users, stored]);
    return toPublic(stored);
  }

  async update(id: string, input: UpdateAdminUserInput): Promise<AdminUser> {
    const users = readUsers();
    const index = users.findIndex((item) => item.id === id);
    if (index < 0) throw new Error("User not found.");

    if (input.email) {
      const email = input.email.trim().toLowerCase();
      if (users.some((item, i) => i !== index && item.email === email)) {
        throw new Error("An account with this email already exists.");
      }
      users[index].email = email;
    }

    if (input.name !== undefined) users[index].name = input.name.trim();
    if (input.company !== undefined) users[index].company = input.company.trim();
    if (input.phone !== undefined) users[index].phone = input.phone.trim();
    if (input.role !== undefined) users[index].role = input.role;
    if (input.isActive !== undefined) users[index].isActive = input.isActive;
    if (input.password) {
      users[index].passwordHash = hashPassword(input.password);
    }
    users[index].updatedAt = nowIso();

    writeUsers(users);
    return toPublic(users[index]);
  }

  async deactivate(id: string): Promise<void> {
    await this.update(id, { isActive: false });
  }
}
