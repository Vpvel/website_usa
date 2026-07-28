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

const CART_STORAGE_KEY = "angel-starch-shop-cart-v1";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: ShopProduct, quantityKg?: number) => void;
  updateQuantity: (productId: string, quantityKg: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantityKg, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantityKg * item.product.pricePerKg,
      0,
    );

    return {
      items,
      itemCount,
      subtotal,
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
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
