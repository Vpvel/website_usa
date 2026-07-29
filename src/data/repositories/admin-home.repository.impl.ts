import type { AdminHomeContent } from "@/domain/entities/admin";
import type { AdminHomeRepository } from "@/domain/repositories/admin-home.repository";
import { buildSeedHome } from "@/data/datasources/admin-seed.local";
import { homeContentLocal } from "@/data/datasources/home-content.local";
import {
  ADMIN_HOME_KEY,
  readJson,
  writeJson,
} from "@/data/datasources/admin-storage";

function ensureHome(): AdminHomeContent {
  const existing = readJson<AdminHomeContent | null>(ADMIN_HOME_KEY, null);
  if (existing) {
    return {
      ...existing,
      shopBanners: existing.shopBanners?.length
        ? existing.shopBanners
        : homeContentLocal.shopBanners,
    };
  }
  const seed = buildSeedHome();
  writeJson(ADMIN_HOME_KEY, seed);
  return seed;
}

export class AdminHomeRepositoryImpl implements AdminHomeRepository {
  async get(): Promise<AdminHomeContent> {
    return ensureHome();
  }

  async update(content: AdminHomeContent): Promise<AdminHomeContent> {
    writeJson(ADMIN_HOME_KEY, content);
    return content;
  }
}
