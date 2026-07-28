"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ShopProduct } from "@/domain/entities/shop-product";
import { useAuth } from "@/presentation/context/AuthContext";

const WISHLIST_PREFIX = "angel-starch-wishlist-v1";

interface WishlistContextValue {
  items: ShopProduct[];
  count: number;
  has: (productId: string) => boolean;
  toggle: (product: ShopProduct) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function storageKey(userId: string | null) {
  return `${WISHLIST_PREFIX}:${userId ?? "guest"}`;
}

function readWishlist(userId: string | null): ShopProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ShopProduct[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user, hydrated: authHydrated } = useAuth();
  const userId = user?.id ?? null;
  const [items, setItems] = useState<ShopProduct[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!authHydrated) return;
    setItems(readWishlist(userId));
    setHydrated(true);
  }, [authHydrated, userId]);

  useEffect(() => {
    if (!hydrated || !authHydrated) return;
    window.localStorage.setItem(storageKey(userId), JSON.stringify(items));
  }, [items, hydrated, authHydrated, userId]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      count: items.length,
      has: (productId) => items.some((item) => item.id === productId),
      toggle: (product) => {
        setItems((current) => {
          const exists = current.some((item) => item.id === product.id);
          if (exists) {
            return current.filter((item) => item.id !== product.id);
          }
          return [...current, product];
        });
      },
      remove: (productId) => {
        setItems((current) => current.filter((item) => item.id !== productId));
      },
      clear: () => setItems([]),
    }),
    [items],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
