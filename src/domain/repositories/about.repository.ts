import type { AboutContent } from "../entities/about-content";

export interface AboutRepository {
  getAboutContent(): Promise<AboutContent>;
}
