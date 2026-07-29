export const ADMIN_USERS_KEY = "angel-starch-users-v1";
export const ADMIN_SESSION_KEY = "angel-starch-admin-session-v1";
export const ADMIN_CATEGORIES_KEY = "angel-starch-admin-categories-v1";
export const ADMIN_PRODUCTS_KEY = "angel-starch-admin-products-v1";
export const ADMIN_DETAILS_KEY = "angel-starch-admin-details-v1";
export const ADMIN_HOME_KEY = "angel-starch-admin-home-v1";
export const ADMIN_ABOUT_KEY = "angel-starch-admin-about-v1";
export const ADMIN_CONTACT_KEY = "angel-starch-admin-contact-v1";

export { hashPassword } from "@/domain/utils/password";

export function createId(prefix = "id") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  if (value === null || value === undefined) {
    window.localStorage.removeItem(key);
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function toKebabCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
