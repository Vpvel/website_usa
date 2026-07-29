import type { HomeContent } from "./home-content";
import type { AboutContent } from "./about-content";
import type { ContactContent } from "./contact-content";
import type { ShopProductSpec } from "./shop-product";

export type AdminRole = "super_admin" | "admin" | "customer";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStoredUser extends AdminUser {
  passwordHash: string;
}

export interface AdminSession {
  userId: string;
  email: string;
  role: AdminRole;
  loggedInAt: string;
}

export interface AdminCategory {
  id: string;
  title: string;
  description: string;
  overview?: string;
  features?: string[];
  applications?: string[];
  specifications?: ShopProductSpec[];
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  shortName: string;
  summary: string;
  pricePerKg: number;
  currency: "USD";
  minOrderKg: number;
  packaging: string;
  categoryId: string;
  imageSrc: string;
  href: string;
  sourceUrl?: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProductDetails {
  productId: string;
  overview: string;
  features: string[];
  applications: string[];
  specifications: ShopProductSpec[];
  updatedAt: string;
}

export interface CreateAdminUserInput {
  name: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
  role: AdminRole;
  isActive?: boolean;
}

export interface UpdateAdminUserInput {
  name?: string;
  email?: string;
  password?: string;
  company?: string;
  phone?: string;
  role?: AdminRole;
  isActive?: boolean;
}

export interface CreateAdminCategoryInput {
  id: string;
  title: string;
  description: string;
  overview?: string;
  features?: string[];
  applications?: string[];
  specifications?: ShopProductSpec[];
  sortOrder?: number;
  isPublished?: boolean;
}

export type UpdateAdminCategoryInput = Partial<
  Omit<AdminCategory, "id" | "createdAt" | "updatedAt">
>;

export interface CreateAdminProductInput {
  id: string;
  name: string;
  shortName: string;
  summary: string;
  pricePerKg: number;
  minOrderKg: number;
  packaging: string;
  categoryId: string;
  imageSrc: string;
  href?: string;
  sourceUrl?: string;
  isPublished?: boolean;
  sortOrder?: number;
}

export type UpdateAdminProductInput = Partial<
  Omit<AdminProduct, "id" | "currency" | "createdAt" | "updatedAt">
> & { currency?: "USD" };

export interface AdminDashboardStats {
  totalUsers: number;
  categoriesCount: number;
  productsPublished: number;
  productsDraft: number;
  productsMissingDetails: number;
}

export type AdminHomeContent = HomeContent;
export type AdminAboutContent = AboutContent;
export type AdminContactContent = ContactContent;
