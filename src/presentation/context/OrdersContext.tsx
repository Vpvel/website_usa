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
import type {
  ShippingAddress,
  ShopOrder,
} from "@/domain/entities/shop-commerce";
import { useAuth } from "@/presentation/context/AuthContext";

const ADDRESS_PREFIX = "angel-starch-addresses-v1";
const ORDERS_PREFIX = "angel-starch-orders-v1";

interface PlaceOrderInput {
  address: Omit<ShippingAddress, "id" | "isDefault">;
  items: CartItem[];
  note?: string;
  saveAddress?: boolean;
}

interface OrdersContextValue {
  addresses: ShippingAddress[];
  orders: ShopOrder[];
  hydrated: boolean;
  saveAddress: (
    address: Omit<ShippingAddress, "id" | "isDefault"> & { isDefault?: boolean },
  ) => ShippingAddress;
  setDefaultAddress: (addressId: string) => void;
  removeAddress: (addressId: string) => void;
  placeOrder: (input: PlaceOrderInput) => ShopOrder;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

function keyFor(prefix: string, userId: string | null) {
  return `${prefix}:${userId ?? "guest"}`;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const { user, hydrated: authHydrated } = useAuth();
  const userId = user?.id ?? null;
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [orders, setOrders] = useState<ShopOrder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!authHydrated) return;
    setAddresses(readJson(keyFor(ADDRESS_PREFIX, userId), []));
    setOrders(readJson(keyFor(ORDERS_PREFIX, userId), []));
    setHydrated(true);
  }, [authHydrated, userId]);

  useEffect(() => {
    if (!hydrated || !authHydrated) return;
    window.localStorage.setItem(
      keyFor(ADDRESS_PREFIX, userId),
      JSON.stringify(addresses),
    );
  }, [addresses, hydrated, authHydrated, userId]);

  useEffect(() => {
    if (!hydrated || !authHydrated) return;
    window.localStorage.setItem(
      keyFor(ORDERS_PREFIX, userId),
      JSON.stringify(orders),
    );
  }, [orders, hydrated, authHydrated, userId]);

  const value = useMemo<OrdersContextValue>(
    () => ({
      addresses,
      orders,
      hydrated,
      saveAddress: (input) => {
        const address: ShippingAddress = {
          id: createId("addr"),
          fullName: input.fullName.trim(),
          company: input.company.trim(),
          phone: input.phone.trim(),
          email: input.email.trim(),
          line1: input.line1.trim(),
          line2: input.line2.trim(),
          city: input.city.trim(),
          state: input.state.trim(),
          postalCode: input.postalCode.trim(),
          country: input.country.trim() || "United States",
          isDefault: Boolean(input.isDefault) || addresses.length === 0,
        };

        setAddresses((current) => {
          const next = address.isDefault
            ? current.map((item) => ({ ...item, isDefault: false }))
            : [...current];
          return [address, ...next.filter((item) => item.id !== address.id)];
        });

        return address;
      },
      setDefaultAddress: (addressId) => {
        setAddresses((current) =>
          current.map((item) => ({
            ...item,
            isDefault: item.id === addressId,
          })),
        );
      },
      removeAddress: (addressId) => {
        setAddresses((current) => current.filter((item) => item.id !== addressId));
      },
      placeOrder: (input) => {
        const itemCountKg = input.items.reduce(
          (sum, item) => sum + item.quantityKg,
          0,
        );
        const subtotal = input.items.reduce(
          (sum, item) => sum + item.quantityKg * item.product.pricePerKg,
          0,
        );

        let address: ShippingAddress = {
          id: createId("addr"),
          ...input.address,
          fullName: input.address.fullName.trim(),
          company: input.address.company.trim(),
          phone: input.address.phone.trim(),
          email: input.address.email.trim(),
          line1: input.address.line1.trim(),
          line2: input.address.line2.trim(),
          city: input.address.city.trim(),
          state: input.address.state.trim(),
          postalCode: input.address.postalCode.trim(),
          country: input.address.country.trim() || "United States",
          isDefault: addresses.length === 0,
        };

        if (input.saveAddress) {
          const saved = {
            ...address,
            isDefault: addresses.length === 0 || address.isDefault,
          };
          setAddresses((current) => {
            const cleared = saved.isDefault
              ? current.map((item) => ({ ...item, isDefault: false }))
              : current;
            return [saved, ...cleared];
          });
          address = saved;
        }

        const order: ShopOrder = {
          id: createId("ord"),
          createdAt: new Date().toISOString(),
          status: "submitted",
          items: input.items,
          itemCountKg,
          subtotal,
          address,
          note: input.note?.trim() ?? "",
        };

        setOrders((current) => [order, ...current]);
        return order;
      },
    }),
    [addresses, orders, hydrated],
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
}
