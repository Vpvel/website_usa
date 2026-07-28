import type { ContactContent } from "../entities/contact-content";
import type { ContactRepository } from "../repositories/contact.repository";

export class GetContactContentUseCase {
  constructor(private readonly repository: ContactRepository) {}

  execute(): Promise<ContactContent> {
    return this.repository.getContactContent();
  }
}
