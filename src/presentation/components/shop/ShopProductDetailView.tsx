"use client";

import { useState } from "react";
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

export function ShopProductDetailView({
  site,
  product,
  categoryTitle,
  related,
}: {
  site: HomeContent;
  product: ShopProduct;
  categoryTitle: string;
  related: ShopProduct[];
}) {
  const vm = useHomeViewModel(site);
  const { addItem, itemCount, productCount } = useCart();
  const { has, toggle, count: wishCount } = useWishlist();
  const [qty, setQty] = useState(product.minOrderKg);
  const [added, setAdded] = useState(false);
  const wished = has(product.id);
  const details = product.details;

  function handleAdd() {
    const amount = Math.max(product.minOrderKg, qty || product.minOrderKg);
    addItem(product, amount);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
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

      <main className="pdp">
        <nav className="pdp__crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/products">Products</Link>
          <span aria-hidden="true"> / </span>
          <Link href={`/products?category=${product.category}`}>{categoryTitle}</Link>
          <span aria-hidden="true"> / </span>
          <span>{product.shortName}</span>
        </nav>

        <section className="pdp__panel">
          <div className="pdp__gallery">
            <div className="pdp__image">
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
            <button
              type="button"
              className={`wish-btn pdp__wish${wished ? " is-active" : ""}`}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wished}
              onClick={() => toggle(product)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {wished ? "favorite" : "favorite_border"}
              </span>
            </button>
          </div>

          <div className="pdp__info">
            <p className="pdp__category">{categoryTitle}</p>
            <h1>{product.name}</h1>
            <p className="pdp__summary">
              {details?.overview ?? product.summary}
            </p>

            <div className="pdp__price-box">
              <p className="pdp__price">
                {formatUsd(product.pricePerKg)}
                <span>/kg</span>
              </p>
              <p className="pdp__pack">
                Packaging: {product.packaging} · Min order {product.minOrderKg} kg
              </p>
            </div>

            <div className="pdp__qty">
              <label htmlFor="pdp-qty">Quantity (kg)</label>
              <input
                id="pdp-qty"
                type="number"
                min={product.minOrderKg}
                step={5}
                value={qty}
                onChange={(event) => setQty(Number(event.target.value))}
              />
            </div>

            <div className="pdp__actions">
              <button
                type="button"
                className={`btn btn--primary pdp__cta${added ? " is-added" : ""}`}
                onClick={handleAdd}
              >
                {added ? "Added to cart" : "Add to cart"}
              </button>
              <Link href="/shop/cart" className="btn btn--ghost">
                View cart ({productCount} · {itemCount} kg)
              </Link>
              <Link href="/shop/wishlist" className="btn btn--ghost">
                Wishlist ({wishCount})
              </Link>
            </div>
            {added ? (
              <p className="pdp__added-note">Added — cart updated in the top menu</p>
            ) : null}

            <div className="pdp__links">
              <Link href="/products">Back to products</Link>
              <Link href="/shop">Browse shop</Link>
              <Link href="/contact#sample">Request a sample</Link>
            </div>
          </div>
        </section>

        {details ? (
          <section className="pdp__details" aria-label="Product details">
            <article className="pdp__block">
              <h2>Product Overview</h2>
              <p>{details.overview}</p>
            </article>

            <article className="pdp__block">
              <h2>Key Features</h2>
              <ul className="pdp__chips">
                {details.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>

            <article className="pdp__block">
              <h2>Applications</h2>
              <ul className="pdp__chips pdp__chips--soft">
                {details.applications.map((application) => (
                  <li key={application}>{application}</li>
                ))}
              </ul>
            </article>

            <article className="pdp__block">
              <h2>Technical Specifications</h2>
              <div className="pdp__table-wrap">
                <table className="pdp__table">
                  <thead>
                    <tr>
                      <th scope="col">Property</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.specifications.map((row) => (
                      <tr key={row.property}>
                        <th scope="row">{row.property}</th>
                        <td>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        ) : (
          <section className="pdp__details">
            <article className="pdp__block">
              <h2>Product details</h2>
              <dl className="pdp__specs">
                <div>
                  <dt>Product</dt>
                  <dd>{product.shortName}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{categoryTitle}</dd>
                </div>
                <div>
                  <dt>Packaging</dt>
                  <dd>{product.packaging}</dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd>In stock · US supply quote available</dd>
                </div>
              </dl>
            </article>
          </section>
        )}

        {related.length > 0 ? (
          <section className="pdp__related" aria-labelledby="related-title">
            <h2 id="related-title">Similar products</h2>
            <div className="pdp__related-grid">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/shop/product/${item.id}`}
                  className="pdp__related-card"
                >
                  <span className="pdp__related-media">
                    <Image
                      src={item.imageSrc}
                      alt={item.shortName}
                      fill
                      sizes="160px"
                    />
                  </span>
                  <strong>{item.shortName}</strong>
                  <span>{formatUsd(item.pricePerKg)}/kg</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
