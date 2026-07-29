import type { AdminAboutContent } from "@/domain/entities/admin";

export interface AdminAboutRepository {
  get(): Promise<AdminAboutContent>;
  update(content: AdminAboutContent): Promise<AdminAboutContent>;
}
