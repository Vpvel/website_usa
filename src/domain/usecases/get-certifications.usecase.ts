import type { CertificationsContent } from "../entities/certification";
import type { CertificationRepository } from "../repositories/certification.repository";

export class GetCertificationsUseCase {
  constructor(private readonly repository: CertificationRepository) {}

  execute(): Promise<CertificationsContent> {
    return this.repository.getAll();
  }
}
