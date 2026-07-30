"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";
import type { ShopCatalog, ShopProduct } from "@/domain/entities/shop-product";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useCart } from "@/presentation/context/CartContext";
import { useWishlist } from "@/presentation/context/WishlistContext";
import {
  useDynamicCatalog,
  useDynamicHome,
} from "@/presentation/context/DynamicContentContext";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";
import { ShopBannerSlider } from "@/presentation/components/shop/ShopBannerSlider";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function CategoryProductCard({
  product,
  addedId,
  onAdd,
  delay,
}: {
  product: ShopProduct;
  addedId: string | null;
  onAdd: (product: ShopProduct) => void;
  delay: number;
}) {
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const isAdded = addedId === product.id;

  return (
    <article
      id={product.id}
      className="shop-cat-card reveal"
      data-reveal
      data-reveal-delay={String(delay)}
    >
      <Link href={`/shop/product/${product.id}`} className="shop-cat-card__media">
        <Image
          src={product.imageSrc}
          alt={product.shortName}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </Link>
      <button
        type="button"
        className={`wish-btn${wished ? " is-active" : ""}`}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wished}
        onClick={() => toggle(product)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {wished ? "favorite" : "favorite_border"}
        </span>
      </button>
      <h3>
        <Link href={`/shop/product/${product.id}`}>{product.shortName}</Link>
      </h3>
      <p className="shop-cat-card__price">{formatUsd(product.pricePerKg)}/kg</p>
      <div className="shop-cat-card__actions">
        <button
          type="button"
          className={`btn btn--primary shop-cat-card__cta${isAdded ? " is-added" : ""}`}
          onClick={() => onAdd(product)}
        >
          {isAdded ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

export function ShopPageView({
  site,
  catalog: catalogSeed,
}: {
  site: HomeContent;
  catalog: ShopCatalog;
}) {
  const siteContent = useDynamicHome(site);
  const catalog = useDynamicCatalog(catalogSeed);
  const vm = useHomeViewModel(siteContent);
  const { addItem, itemCount, productCount } = useCart();
  const { count: wishCount } = useWishlist();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function handleAdd(product: ShopProduct) {
    addItem(product, product.minOrderKg);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1600);
  }

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
      <main className="shop-shell">
        <ShopBannerSlider banners={siteContent.shopBanners} />

        <div className="shop-page">
          <section className="shop-toolbar reveal" data-reveal>
            <div>
              <p className="shop-hero__eyebrow">Angel Starch Shop</p>
              <h1>Shop starch & food ingredients</h1>
              <p>
                Browse categories, add to cart by kg, save favorites, and
                complete local address checkout.
              </p>
            </div>
            <div className="shop-hero__actions">
              <Link href="/shop/cart" className="btn btn--primary">
                View cart ({productCount} · {itemCount} kg)
              </Link>
              <Link href="/shop/wishlist" className="btn btn--ghost">
                Wishlist ({wishCount})
              </Link>
              <Link href="/shop/orders" className="btn btn--ghost">
                Order history
              </Link>
            </div>
          </section>

          <nav className="shop-category-nav" aria-label="Shop categories">
            {catalog.categories.map((category, index) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="reveal"
                data-reveal
                data-reveal-delay={String(80 + index * 60)}
              >
                {category.title}
              </a>
            ))}
          </nav>

        {catalog.categories.map((category, categoryIndex) => {
          const isExpanded = Boolean(expanded[category.id]);
          const description = isExpanded
            ? category.description
            : category.description.length > 160
              ? `${category.description.slice(0, 160).trim()}…`
              : category.description;

          return (
            <section
              key={category.id}
              id={category.id}
              className="shop-category"
              aria-labelledby={`${category.id}-title`}
            >
              <header
                className="shop-category__header reveal"
                data-reveal
                data-reveal-delay={String(categoryIndex * 40)}
              >
                <h2 id={`${category.id}-title`}>{category.title}</h2>
                <p>{description}</p>
                {category.description.length > 160 ? (
                  <button
                    type="button"
                    className="shop-category__more"
                    onClick={() =>
                      setExpanded((current) => ({
                        ...current,
                        [category.id]: !current[category.id],
                      }))
                    }
                  >
                    {isExpanded ? "View less" : "View More"}
                  </button>
                ) : null}
              </header>

              <div className="shop-category__grid">
                {category.products.map((product, index) => (
                  <CategoryProductCard
                    key={product.id}
                    product={product}
                    addedId={addedId}
                    onAdd={handleAdd}
                    delay={80 + index * 95}
                  />
                ))}
              </div>

              <div
                className="shop-category__footer reveal"
                data-reveal
                data-reveal-delay="280"
              >
                <Link href="/contact#sample" className="btn btn--ghost">
                  View more details
                </Link>
              </div>
            </section>
          );
        })}
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
