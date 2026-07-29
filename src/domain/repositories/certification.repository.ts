import type { CertificationsContent } from "../entities/certification";

export interface CertificationRepository {
  getAll(): Promise<CertificationsContent>;
}
