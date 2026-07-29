import type { AdminAboutContent } from "@/domain/entities/admin";
import type { AdminAboutRepository } from "@/domain/repositories/admin-about.repository";
import { buildSeedAbout } from "@/data/datasources/admin-seed.local";
import {
  ADMIN_ABOUT_KEY,
  readJson,
  writeJson,
} from "@/data/datasources/admin-storage";

function ensureAbout(): AdminAboutContent {
  const existing = readJson<AdminAboutContent | null>(ADMIN_ABOUT_KEY, null);
  if (existing) return existing;
  const seed = buildSeedAbout();
  writeJson(ADMIN_ABOUT_KEY, seed);
  return seed;
}

export class AdminAboutRepositoryImpl implements AdminAboutRepository {
  async get(): Promise<AdminAboutContent> {
    return ensureAbout();
  }

  async update(content: AdminAboutContent): Promise<AdminAboutContent> {
    writeJson(ADMIN_ABOUT_KEY, content);
    return content;
  }
}
