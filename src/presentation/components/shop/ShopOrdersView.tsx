"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useOrders } from "@/presentation/context/OrdersContext";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function ShopOrdersView({ site }: { site: HomeContent }) {
  const vm = useHomeViewModel(site);
  const { orders } = useOrders();
  const searchParams = useSearchParams();
  const placedId = searchParams.get("placed");

  return (
    <>
      <SiteHeader
        brandName={vm.brandName}
        navigation={vm.navigation}
        isMobileMenuOpen={vm.isMobileMenuOpen}
        openDropdownId={vm.openDropdownId}
        toggleMobileMenu={vm.toggleMobileMenu}
        closeMobileMenu={vm.closeMobileMenu}
        openDropdown={vm.openDropdown}
        closeDropdown={vm.closeDropdown}
        toggleDropdown={vm.toggleDropdown}
      />
      <main className="shop-cart">
        <div className="shop-cart__header">
          <h1>Order history</h1>
          <p>Local order requests saved in this browser for your session.</p>
        </div>

        {placedId ? (
          <p className="account-card__success" role="status">
            Order {placedId} submitted locally. Our team can follow up from your
            address details.
          </p>
        ) : null}

        {orders.length === 0 ? (
          <div className="shop-cart__empty">
            <p>No orders yet.</p>
            <Link href="/shop" className="btn btn--primary">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="shop-orders-list">
            {orders.map((order) => (
              <article key={order.id} className="shop-order-card">
                <header>
                  <div>
                    <h2>{order.id}</h2>
                    <p>{formatDate(order.createdAt)}</p>
                  </div>
                  <span className="shop-order-card__status">{order.status}</span>
                </header>
                <p>
                  {order.itemCountKg} kg · {formatUsd(order.subtotal)} ·{" "}
                  {order.address.city}, {order.address.state}
                </p>
                <ul>
                  {order.items.map((item) => (
                    <li key={`${order.id}-${item.product.id}`}>
                      {item.product.shortName} — {item.quantityKg} kg
                    </li>
                  ))}
                </ul>
                <p className="shop-order-card__address">
                  Ship to: {order.address.fullName}, {order.address.line1},{" "}
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.postalCode}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="shop-cart__actions" style={{ marginTop: "1.25rem" }}>
          <Link href="/shop" className="btn btn--primary">
            Continue shopping
          </Link>
          <Link href="/shop/cart" className="btn btn--ghost">
            View cart
          </Link>
        </div>
      </main>
      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
