"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";
import type { ShopProduct } from "@/domain/entities/shop-product";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useCart } from "@/presentation/context/CartContext";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function ShopPageView({
  site,
  products,
}: {
  site: HomeContent;
  products: ShopProduct[];
}) {
  const vm = useHomeViewModel(site);
  const { addItem, itemCount } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  return (
    <>
      <RevealOnScroll />
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
      <main className="shop-page">
        <section className="shop-hero reveal" data-reveal>
          <p className="shop-hero__eyebrow">Angel Starch Shop</p>
          <h1>Bakery Products Modified Starch</h1>
          <p>
            Industrial starch shop for bakery formulators — modified starches,
            CWS systems, and instant jam mixes. Add to cart by kg, then request
            a quote for US supply.
          </p>
          <div className="shop-hero__actions">
            <Link href="/shop/cart" className="btn btn--primary">
              View cart ({itemCount} kg)
            </Link>
            <a
              href="https://www.indiamart.com/angelfoodstarch/bakery-products-modified-starch.html"
              className="btn btn--ghost"
              target="_blank"
              rel="noreferrer"
            >
              Source catalog reference
            </a>
          </div>
        </section>

        <section className="shop-grid" aria-label="Starch products">
          {products.map((product, index) => (
            <article
              key={product.id}
              id={product.id}
              className="shop-card reveal"
              data-reveal
              data-reveal-delay={String((index % 4) * 80)}
            >
              <div className="shop-card__media">
                <Image
                  src={product.imageSrc}
                  alt={product.shortName}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="shop-card__body">
                <h2>{product.shortName}</h2>
                <p className="shop-card__name">{product.name}</p>
                <p className="shop-card__summary">{product.summary}</p>
                <div className="shop-card__meta">
                  <strong>{formatUsd(product.pricePerKg)}/kg</strong>
                  <span>MOQ {product.minOrderKg} kg</span>
                  <span>{product.packaging}</span>
                </div>
                <div className="shop-card__actions">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => {
                      addItem(product, product.minOrderKg);
                      setAddedId(product.id);
                      window.setTimeout(() => setAddedId(null), 1600);
                    }}
                  >
                    {addedId === product.id ? "Added to cart" : "Add to cart"}
                  </button>
                  <Link href="/shop/cart" className="btn btn--outline-green">
                    Go to cart
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
