"use client";

import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useCart } from "@/presentation/context/CartContext";
import { useWishlist } from "@/presentation/context/WishlistContext";
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
  const { has, toggle, count: wishCount } = useWishlist();
  const lineCount = items.length;

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
          <div>
            <p className="shop-cart__eyebrow">Angel Starch Shop</p>
            <h1>Your cart</h1>
            <p>
              {lineCount > 0
                ? `${lineCount} product${lineCount === 1 ? "" : "s"} · ${itemCount} kg ready for checkout`
                : "Your starch cart is empty. Browse the shop to add products."}
            </p>
          </div>
          <Link href="/shop" className="btn btn--ghost shop-cart__continue-top">
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="shop-cart__empty">
            <span className="material-symbols-outlined" aria-hidden="true">
              shopping_cart
            </span>
            <h2>Cart is empty</h2>
            <p>Add bakery starches, tapioca grades, or food ingredients to get started.</p>
            <div className="shop-cart__empty-actions">
              <Link href="/shop" className="btn btn--primary btn--lg">
                Continue shopping
              </Link>
              {wishCount > 0 ? (
                <Link href="/shop/wishlist" className="btn btn--ghost">
                  View wishlist ({wishCount})
                </Link>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="shop-cart__layout">
            <div className="shop-cart__list">
              {items.map((item) => {
                const wished = has(item.product.id);
                const lineTotal = item.quantityKg * item.product.pricePerKg;
                return (
                  <article key={item.product.id} className="shop-cart__row">
                    <div className="shop-cart__media">
                      <Image
                        src={item.product.imageSrc}
                        alt={item.product.shortName}
                        fill
                        sizes="120px"
                      />
                      <button
                        type="button"
                        className={`wish-btn${wished ? " is-active" : ""}`}
                        aria-label={
                          wished ? "Remove from wishlist" : "Add to wishlist"
                        }
                        aria-pressed={wished}
                        onClick={() => toggle(item.product)}
                      >
                        <span
                          className="material-symbols-outlined"
                          aria-hidden="true"
                        >
                          {wished ? "favorite" : "favorite_border"}
                        </span>
                      </button>
                    </div>
                    <div className="shop-cart__info">
                      <h2>{item.product.shortName}</h2>
                      <p>{item.product.name}</p>
                      <p className="shop-cart__price">
                        {formatUsd(item.product.pricePerKg)}
                        <span>/kg</span>
                      </p>
                      <p className="shop-cart__meta">
                        MOQ {item.product.minOrderKg} kg · {item.product.packaging}
                      </p>
                    </div>
                    <div className="shop-cart__qty">
                      <label htmlFor={`qty-${item.product.id}`}>Quantity (kg)</label>
                      <div className="qty-stepper">
                        <button
                          type="button"
                          className="qty-stepper__btn"
                          aria-label="Decrease quantity"
                          disabled={item.quantityKg <= item.product.minOrderKg}
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(
                                item.product.minOrderKg,
                                item.quantityKg - 5,
                              ),
                            )
                          }
                        >
                          <span className="material-symbols-outlined" aria-hidden="true">
                            remove
                          </span>
                        </button>
                        <input
                          id={`qty-${item.product.id}`}
                          type="number"
                          min={item.product.minOrderKg}
                          step={5}
                          value={item.quantityKg}
                          onChange={(event) =>
                            updateQuantity(
                              item.product.id,
                              Math.max(
                                item.product.minOrderKg,
                                Number(event.target.value) ||
                                  item.product.minOrderKg,
                              ),
                            )
                          }
                        />
                        <button
                          type="button"
                          className="qty-stepper__btn"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantityKg + 5,
                            )
                          }
                        >
                          <span className="material-symbols-outlined" aria-hidden="true">
                            add
                          </span>
                        </button>
                      </div>
                      <button
                        type="button"
                        className="shop-cart__remove"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="shop-cart__line">
                      <span>Line total</span>
                      <strong>{formatUsd(lineTotal)}</strong>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="shop-cart__summary">
              <p className="shop-cart__summary-eyebrow">Order summary</p>
              <h2>Checkout ready</h2>

              <dl className="shop-cart__totals">
                <div>
                  <dt>Products</dt>
                  <dd>{lineCount}</dd>
                </div>
                <div>
                  <dt>Total volume</dt>
                  <dd>{itemCount} kg</dd>
                </div>
                <div className="shop-cart__totals-subtotal">
                  <dt>Estimated subtotal</dt>
                  <dd>{formatUsd(subtotal)}</dd>
                </div>
              </dl>

              <p className="shop-cart__note">
                Next: confirm shipping address and submit your local order
                request. Final commercial pricing is confirmed with US sales.
              </p>

              <div className="shop-cart__actions">
                <Link href="/shop/checkout" className="btn btn--primary btn--lg">
                  Continue to address
                </Link>
                <Link href="/shop" className="btn btn--ghost shop-cart__continue">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    storefront
                  </span>
                  Continue shopping
                </Link>
                <button
                  type="button"
                  className="shop-cart__clear"
                  onClick={clearCart}
                >
                  Clear cart
                </button>
              </div>
            </aside>
          </div>
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
