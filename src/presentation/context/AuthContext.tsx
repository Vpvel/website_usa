"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthSession, StoredUser, UserProfile } from "@/domain/entities/user";

const USERS_KEY = "angel-starch-users-v1";
const SESSION_KEY = "angel-starch-session-v1";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface ProfileUpdateInput {
  name: string;
  company: string;
  phone: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  hydrated: boolean;
  register: (input: RegisterInput) => { ok: true } | { ok: false; error: string };
  login: (input: LoginInput) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  updateProfile: (
    input: ProfileUpdateInput,
  ) => { ok: true } | { ok: false; error: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

function hashPassword(password: string) {
  // Local-only demo hash (not for production auth).
  return btoa(`angel-starch::${password.trim()}`);
}

function toProfile(user: StoredUser): UserProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null) {
  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `user-${Date.now()}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const session = readSession();
    if (session) {
      const match = readUsers().find((item) => item.id === session.userId);
      setUser(match ? toProfile(match) : null);
      if (!match) writeSession(null);
    }
    setHydrated(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      register: (input) => {
        const email = input.email.trim().toLowerCase();
        const name = input.name.trim();
        const password = input.password.trim();

        if (!name || !email || password.length < 6) {
          return {
            ok: false,
            error: "Name, email, and a password of at least 6 characters are required.",
          };
        }

        const users = readUsers();
        if (users.some((item) => item.email === email)) {
          return { ok: false, error: "An account with this email already exists." };
        }

        const now = new Date().toISOString();
        const stored: StoredUser = {
          id: createId(),
          name,
          email,
          company: input.company?.trim() ?? "",
          phone: input.phone?.trim() ?? "",
          passwordHash: hashPassword(password),
          createdAt: now,
          updatedAt: now,
        };

        writeUsers([...users, stored]);
        writeSession({
          userId: stored.id,
          email: stored.email,
          loggedInAt: now,
        });
        setUser(toProfile(stored));
        return { ok: true };
      },
      login: (input) => {
        const email = input.email.trim().toLowerCase();
        const password = input.password.trim();
        const match = readUsers().find((item) => item.email === email);

        if (!match || match.passwordHash !== hashPassword(password)) {
          return { ok: false, error: "Invalid email or password." };
        }

        const now = new Date().toISOString();
        writeSession({
          userId: match.id,
          email: match.email,
          loggedInAt: now,
        });
        setUser(toProfile(match));
        return { ok: true };
      },
      logout: () => {
        writeSession(null);
        setUser(null);
      },
      updateProfile: (input) => {
        if (!user) {
          return { ok: false, error: "You must be signed in to update your profile." };
        }

        const name = input.name.trim();
        if (!name) {
          return { ok: false, error: "Name is required." };
        }

        const users = readUsers();
        const index = users.findIndex((item) => item.id === user.id);
        if (index < 0) {
          return { ok: false, error: "Account not found." };
        }

        const updated: StoredUser = {
          ...users[index],
          name,
          company: input.company.trim(),
          phone: input.phone.trim(),
          updatedAt: new Date().toISOString(),
        };
        const next = [...users];
        next[index] = updated;
        writeUsers(next);
        setUser(toProfile(updated));
        return { ok: true };
      },
    }),
    [user, hydrated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
