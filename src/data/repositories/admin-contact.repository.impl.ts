import type { AdminContactContent } from "@/domain/entities/admin";
import type { AdminContactRepository } from "@/domain/repositories/admin-contact.repository";
import { buildSeedContact } from "@/data/datasources/admin-seed.local";
import {
  ADMIN_CONTACT_KEY,
  readJson,
  writeJson,
} from "@/data/datasources/admin-storage";

function ensureContact(): AdminContactContent {
  const existing = readJson<AdminContactContent | null>(ADMIN_CONTACT_KEY, null);
  if (existing) return existing;
  const seed = buildSeedContact();
  writeJson(ADMIN_CONTACT_KEY, seed);
  return seed;
}

export class AdminContactRepositoryImpl implements AdminContactRepository {
  async get(): Promise<AdminContactContent> {
    return ensureContact();
  }

  async update(content: AdminContactContent): Promise<AdminContactContent> {
    writeJson(ADMIN_CONTACT_KEY, content);
    return content;
  }
}
