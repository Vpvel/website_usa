"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/presentation/context/AuthContext";
import { CartProvider } from "@/presentation/context/CartContext";
import { WishlistProvider } from "@/presentation/context/WishlistContext";
import { OrdersProvider } from "@/presentation/context/OrdersContext";
import { DynamicContentProvider } from "@/presentation/context/DynamicContentContext";
import { PageTransition } from "@/presentation/components/PageTransition";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DynamicContentProvider>
        <CartProvider>
          <WishlistProvider>
            <OrdersProvider>
              <PageTransition />
              <div className="page-shell">{children}</div>
            </OrdersProvider>
          </WishlistProvider>
        </CartProvider>
      </DynamicContentProvider>
    </AuthProvider>
  );
}
