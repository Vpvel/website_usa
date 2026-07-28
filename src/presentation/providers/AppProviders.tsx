"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/presentation/context/AuthContext";
import { CartProvider } from "@/presentation/context/CartContext";
import { WishlistProvider } from "@/presentation/context/WishlistContext";
import { OrdersProvider } from "@/presentation/context/OrdersContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrdersProvider>{children}</OrdersProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
