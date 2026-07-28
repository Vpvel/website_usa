"use client";

import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useCart } from "@/presentation/context/CartContext";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function ShopCartView({ site }: { site: HomeContent }) {
  const vm = useHomeViewModel(site);
  const { items, subtotal, updateQuantity, removeItem, clearCart, itemCount } =
    useCart();

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
          <h1>Starch shop cart</h1>
          <p>
            Review bakery modified starch items, adjust kg quantities, then
            request a quote for US delivery.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="shop-cart__empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="btn btn--primary">
              Browse starch shop
            </Link>
          </div>
        ) : (
          <>
            <div className="shop-cart__list">
              {items.map((item) => (
                <article key={item.product.id} className="shop-cart__row">
                  <div className="shop-cart__media">
                    <Image
                      src={item.product.imageSrc}
                      alt={item.product.shortName}
                      fill
                      sizes="120px"
                    />
                  </div>
                  <div className="shop-cart__info">
                    <h2>{item.product.shortName}</h2>
                    <p>{item.product.name}</p>
                    <p className="shop-cart__price">
                      {formatUsd(item.product.pricePerKg)}/kg
                    </p>
                  </div>
                  <div className="shop-cart__qty">
                    <label htmlFor={`qty-${item.product.id}`}>Qty (kg)</label>
                    <input
                      id={`qty-${item.product.id}`}
                      type="number"
                      min={item.product.minOrderKg}
                      step={25}
                      value={item.quantityKg}
                      onChange={(event) =>
                        updateQuantity(
                          item.product.id,
                          Number(event.target.value) || 0,
                        )
                      }
                    />
                    <button
                      type="button"
                      className="shop-cart__remove"
                      onClick={() => removeItem(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="shop-cart__line">
                    {formatUsd(item.quantityKg * item.product.pricePerKg)}
                  </div>
                </article>
              ))}
            </div>

            <aside className="shop-cart__summary">
              <h2>Order summary</h2>
              <p>
                Total volume: <strong>{itemCount} kg</strong>
              </p>
              <p>
                Estimated subtotal: <strong>{formatUsd(subtotal)}</strong>
              </p>
              <p className="shop-cart__note">
                Final pricing confirmed with technical sales for US distribution
                and packaging.
              </p>
              <div className="shop-cart__actions">
                <Link href="/contact#sample" className="btn btn--primary btn--lg">
                  Request quote
                </Link>
                <Link href="/shop" className="btn btn--outline-green">
                  Continue shopping
                </Link>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={clearCart}
                >
                  Clear cart
                </button>
              </div>
            </aside>
          </>
        )}
      </main>
      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
