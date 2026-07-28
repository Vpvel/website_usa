import type { ContactContent } from "@/domain/entities/contact-content";
import type { ContactRepository } from "@/domain/repositories/contact.repository";
import { contactContentLocal } from "@/data/datasources/contact-content.local";

export class ContactRepositoryImpl implements ContactRepository {
  async getContactContent(): Promise<ContactContent> {
    return contactContentLocal;
  }
}
