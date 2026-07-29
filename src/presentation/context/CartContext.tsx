"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/domain/entities/cart";
import type { ShopProduct } from "@/domain/entities/shop-product";
import { useAuth } from "@/presentation/context/AuthContext";

const CART_PREFIX = "angel-starch-shop-cart-v1";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  productCount: number;
  subtotal: number;
  lastAddedAt: number;
  addItem: (product: ShopProduct, quantityKg?: number) => void;
  updateQuantity: (productId: string, quantityKg: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartKey(userId: string | null) {
  return `${CART_PREFIX}:${userId ?? "guest"}`;
}

function readStoredCart(userId: string | null): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const key = cartKey(userId);
    let raw = window.localStorage.getItem(key);
    if (!raw && !userId) {
      raw = window.localStorage.getItem(CART_PREFIX);
    }
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, hydrated: authHydrated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(0);
  const userId = user?.id ?? null;

  useEffect(() => {
    if (!authHydrated) return;
    setItems(readStoredCart(userId));
    setHydrated(true);
  }, [authHydrated, userId]);

  useEffect(() => {
    if (!hydrated || !authHydrated) return;
    window.localStorage.setItem(cartKey(userId), JSON.stringify(items));
  }, [items, hydrated, authHydrated, userId]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantityKg, 0);
    const productCount = items.length;
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantityKg * item.product.pricePerKg,
      0,
    );

    return {
      items,
      itemCount,
      productCount,
      subtotal,
      lastAddedAt,
      addItem: (product, quantityKg = product.minOrderKg) => {
        setItems((current) => {
          const existing = current.find((item) => item.product.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.product.id === product.id
                ? {
                    ...item,
                    quantityKg: item.quantityKg + quantityKg,
                  }
                : item,
            );
          }
          return [...current, { product, quantityKg }];
        });
        setLastAddedAt(Date.now());
      },
      updateQuantity: (productId, quantityKg) => {
        setItems((current) =>
          current
            .map((item) =>
              item.product.id === productId
                ? { ...item, quantityKg: Math.max(0, quantityKg) }
                : item,
            )
            .filter((item) => item.quantityKg > 0),
        );
      },
      removeItem: (productId) => {
        setItems((current) =>
          current.filter((item) => item.product.id !== productId),
        );
      },
      clearCart: () => setItems([]),
    };
  }, [items, lastAddedAt]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
