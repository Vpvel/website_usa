import type { ContactContent } from "../entities/contact-content";

export interface ContactRepository {
  getContactContent(): Promise<ContactContent>;
}
