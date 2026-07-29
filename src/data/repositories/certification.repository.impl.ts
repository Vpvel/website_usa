import type { CertificationsContent } from "@/domain/entities/certification";
import type { CertificationRepository } from "@/domain/repositories/certification.repository";
import { certificationsLocal } from "@/data/datasources/certifications.local";

export class CertificationRepositoryImpl implements CertificationRepository {
  async getAll(): Promise<CertificationsContent> {
    return certificationsLocal;
  }
}
