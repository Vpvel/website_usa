import type { AdminContactContent } from "@/domain/entities/admin";

export interface AdminContactRepository {
  get(): Promise<AdminContactContent>;
  update(content: AdminContactContent): Promise<AdminContactContent>;
}
