import type { AdminHomeContent } from "@/domain/entities/admin";

export interface AdminHomeRepository {
  get(): Promise<AdminHomeContent>;
  update(content: AdminHomeContent): Promise<AdminHomeContent>;
}
