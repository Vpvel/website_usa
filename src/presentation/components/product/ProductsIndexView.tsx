"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { HomeContent } from "@/domain/entities/home-content";
import type {
  ShopCatalog,
  ShopCategoryId,
  ShopProduct,
} from "@/domain/entities/shop-product";
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

type FilterId = "all" | ShopCategoryId;

function isCategoryId(
  value: string | null,
  categories: ShopCategoryId[],
): value is ShopCategoryId {
  return Boolean(value && categories.includes(value as ShopCategoryId));
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function ProductCard({
  product,
  categoryTitle,
  addedId,
  onAdd,
}: {
  product: ShopProduct;
  categoryTitle: string;
  addedId: string | null;
  onAdd: (product: ShopProduct) => void;
}) {
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const isAdded = addedId === product.id;

  return (
    <article className="fk-card">
      <Link href={`/shop/product/${product.id}`} className="fk-card__media">
        <Image
          src={product.imageSrc}
          alt={product.shortName}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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

      <div className="fk-card__body">
        <p className="fk-card__category">{categoryTitle}</p>
        <h3 title={product.name}>
          <Link href={`/shop/product/${product.id}`}>{product.shortName}</Link>
        </h3>
        <p className="fk-card__summary">{product.summary}</p>
        <p className="fk-card__price">
          {formatUsd(product.pricePerKg)}
          <span>/kg</span>
        </p>
        <p className="fk-card__meta">
          Min {product.minOrderKg} kg · {product.packaging}
        </p>
        <div className="fk-card__actions">
          <button
            type="button"
            className={`btn btn--primary fk-card__cta${isAdded ? " is-added" : ""}`}
            onClick={() => onAdd(product)}
          >
            {isAdded ? "Added" : "Add to cart"}
          </button>
          <Link href={`/shop/product/${product.id}`} className="fk-card__link">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductsIndexView({
  site,
  catalog: catalogSeed,
}: {
  site: HomeContent;
  catalog: ShopCatalog;
}) {
  const siteContent = useDynamicHome(site);
  const catalog = useDynamicCatalog(catalogSeed);
  const vm = useHomeViewModel(siteContent);
  const searchParams = useSearchParams();
  const { addItem, itemCount, productCount } = useCart();
  const { count: wishCount } = useWishlist();
  const categoryIds = catalog.categories.map((category) => category.id);
  const categoryParam = searchParams.get("category");
  const initialFilter: FilterId = isCategoryId(categoryParam, categoryIds)
    ? categoryParam
    : "all";
  const [filter, setFilter] = useState<FilterId>(initialFilter);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categoryTitleById = useMemo(() => {
    return Object.fromEntries(
      catalog.categories.map((category) => [category.id, category.title]),
    ) as Record<ShopCategoryId, string>;
  }, [catalog.categories]);

  const products = useMemo(() => {
    const all = catalog.categories.flatMap((category) => category.products);
    if (filter === "all") return all;
    return all.filter((product) => product.category === filter);
  }, [catalog.categories, filter]);

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

      <main className="fk-products">
        <div className="fk-products__toolbar">
          <div>
            <p className="fk-products__eyebrow">Angel Starch catalog</p>
            <h1>Products</h1>
          </div>
          <div className="fk-products__toolbar-actions">
            <Link href="/shop/cart" className="btn btn--ghost">
              Cart ({productCount} · {itemCount} kg)
            </Link>
            <Link href="/shop/wishlist" className="btn btn--ghost">
              Wishlist ({wishCount})
            </Link>
            <Link href="/shop" className="btn btn--primary">
              Open shop
            </Link>
          </div>
        </div>

        <div className="fk-products__layout">
          <aside className="fk-products__sidebar" aria-label="Product filters">
            <p className="fk-products__sidebar-title">Categories</p>
            <button
              type="button"
              className={`fk-filter${filter === "all" ? " is-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <span>All products</span>
              <span>
                {catalog.categories.reduce(
                  (total, category) => total + category.products.length,
                  0,
                )}
              </span>
            </button>
            {catalog.categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`fk-filter${filter === category.id ? " is-active" : ""}`}
                onClick={() => setFilter(category.id)}
              >
                <span>{category.title}</span>
                <span>{category.products.length}</span>
              </button>
            ))}
          </aside>

          <section className="fk-products__main">
            <div className="fk-products__resultbar">
              <p>
                Showing <strong>{products.length}</strong> product
                {products.length === 1 ? "" : "s"}
                {filter !== "all" ? (
                  <>
                    {" "}
                    in <strong>{categoryTitleById[filter]}</strong>
                  </>
                ) : null}
              </p>
            </div>

            <div className="fk-products__chips" aria-label="Quick categories">
              <button
                type="button"
                className={`fk-chip${filter === "all" ? " is-active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              {catalog.categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`fk-chip${filter === category.id ? " is-active" : ""}`}
                  onClick={() => setFilter(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {products.length > 0 ? (
              <div className="fk-products__grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryTitle={categoryTitleById[product.category]}
                    addedId={addedId}
                    onAdd={handleAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="fk-products__empty">
                <p>No products in this category yet.</p>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => setFilter("all")}
                >
                  View all products
                </button>
              </div>
            )}
          </section>
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
