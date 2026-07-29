"use client";

import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";
import type { ShopProduct } from "@/domain/entities/shop-product";
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

export function ShopWishlistView({ site }: { site: HomeContent }) {
  const vm = useHomeViewModel(site);
  const { items, remove, count } = useWishlist();
  const { addItem } = useCart();

  function handleAdd(product: ShopProduct) {
    addItem(product, product.minOrderKg);
  }

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
          <h1>Wishlist</h1>
          <p>
            Saved starch products stored locally in this browser
            {count > 0 ? ` · ${count} item${count === 1 ? "" : "s"}` : ""}.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="shop-cart__empty">
            <p>Your wishlist is empty.</p>
            <Link href="/shop" className="btn btn--primary">
              Browse shop
            </Link>
          </div>
        ) : (
          <div className="shop-wishlist-grid">
            {items.map((product) => (
              <article key={product.id} className="shop-wishlist-card">
                <Link
                  href={`/shop/product/${product.id}`}
                  className="shop-wishlist-card__media"
                >
                  <Image
                    src={product.imageSrc}
                    alt={product.shortName}
                    fill
                    sizes="220px"
                  />
                </Link>
                <button
                  type="button"
                  className="wish-btn is-active"
                  aria-label="Remove from wishlist"
                  onClick={() => remove(product.id)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    favorite
                  </span>
                </button>
                <h2>
                  <Link href={`/shop/product/${product.id}`}>
                    {product.shortName}
                  </Link>
                </h2>
                <p>{formatUsd(product.pricePerKg)}/kg</p>
                <div className="shop-wishlist-card__actions">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => handleAdd(product)}
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => remove(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
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
