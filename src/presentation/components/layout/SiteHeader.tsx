"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/domain/entities/nav-item";
import type { HomeViewState } from "@/presentation/viewmodels/useHomeViewModel";
import { useClickOutside } from "@/presentation/viewmodels/useHomeViewModel";
import { useCart } from "@/presentation/context/CartContext";
import { useAuth } from "@/presentation/context/AuthContext";
import { useWishlist } from "@/presentation/context/WishlistContext";

export function SiteHeader({
  brandName,
  navigation,
  isMobileMenuOpen,
  openDropdownId,
  toggleMobileMenu,
  closeMobileMenu,
  openDropdown,
  closeDropdown,
  toggleDropdown,
}: Pick<
  HomeViewState,
  | "brandName"
  | "navigation"
  | "isMobileMenuOpen"
  | "openDropdownId"
  | "toggleMobileMenu"
  | "closeMobileMenu"
  | "openDropdown"
  | "closeDropdown"
  | "toggleDropdown"
>) {
  const navRef = useRef<HTMLElement>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const { itemCount, items } = useCart();
  const { user } = useAuth();
  const { count: wishCount } = useWishlist();
  const cartProductCount = items.length;
  const cartBadge = cartProductCount > 0 ? cartProductCount : 0;

  useClickOutside(
    navRef,
    () => {
      closeDropdown();
      setIsShopMenuOpen(false);
    },
    openDropdownId !== null || isShopMenuOpen,
  );

  const accountHref = user ? "/account/profile" : "/account/login";
  const accountLabel = user ? "Profile" : "Sign in";

  function closeShopMenu() {
    setIsShopMenuOpen(false);
  }

  return (
    <header className="site-header" ref={navRef}>
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__brand"
          onClick={() => {
            closeMobileMenu();
            closeShopMenu();
          }}
        >
          <Image
            src="/images/logo/angel-starch-logo.webp"
            alt={brandName}
            width={180}
            height={56}
            className="site-header__logo"
            priority
          />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {navigation.map((item, index) => (
            <NavItemDesktop
              key={item.id}
              item={item}
              isOpen={openDropdownId === item.id}
              showDivider={index < navigation.length - 1}
              onOpen={() => {
                closeShopMenu();
                openDropdown(item.id);
              }}
              onClose={closeDropdown}
              onToggle={() => {
                closeShopMenu();
                toggleDropdown(item.id);
              }}
            />
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/contact#sample" className="btn btn--primary">
            Request a Sample
          </Link>

          <div className={`site-header__shop${isShopMenuOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="btn btn--ghost shop-link"
              aria-expanded={isShopMenuOpen}
              aria-haspopup="true"
              aria-controls="shop-quick-menu"
              onClick={() => {
                closeDropdown();
                setIsShopMenuOpen((open) => !open);
              }}
            >
              Shop starch
              {cartBadge > 0 ? (
                <span className="shop-link__badge">{cartBadge}</span>
              ) : null}
              <span className="material-symbols-outlined shop-link__chevron" aria-hidden="true">
                {isShopMenuOpen ? "expand_less" : "expand_more"}
              </span>
            </button>

            {isShopMenuOpen ? (
              <div
                id="shop-quick-menu"
                className="site-header__shop-menu"
                role="menu"
                aria-label="Shop quick actions"
              >
                <Link
                  href="/shop"
                  className="site-header__shop-item"
                  role="menuitem"
                  onClick={closeShopMenu}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    storefront
                  </span>
                  <span>
                    <strong>Browse shop</strong>
                    <small>Categories & products</small>
                  </span>
                </Link>
                <Link
                  href="/shop/cart"
                  className="site-header__shop-item"
                  role="menuitem"
                  onClick={closeShopMenu}
                >
                  <span className="site-header__shop-icon-wrap">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      shopping_cart
                    </span>
                    {cartBadge > 0 ? (
                      <span className="shop-link__badge">{cartBadge}</span>
                    ) : null}
                  </span>
                  <span>
                    <strong>Cart</strong>
                    <small>
                      {cartProductCount > 0
                        ? `${cartProductCount} products · ${itemCount} kg`
                        : "Cart summary"}
                    </small>
                  </span>
                </Link>
                <Link
                  href="/shop/wishlist"
                  className="site-header__shop-item"
                  role="menuitem"
                  onClick={closeShopMenu}
                >
                  <span className="site-header__shop-icon-wrap">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      favorite
                    </span>
                    {wishCount > 0 ? (
                      <span className="shop-link__badge">{wishCount}</span>
                    ) : null}
                  </span>
                  <span>
                    <strong>Wishlist</strong>
                    <small>
                      {wishCount > 0
                        ? `${wishCount} saved item${wishCount === 1 ? "" : "s"}`
                        : "Saved favorites"}
                    </small>
                  </span>
                </Link>
                <Link
                  href={accountHref}
                  className="site-header__shop-item"
                  role="menuitem"
                  onClick={closeShopMenu}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {user ? "account_circle" : "person"}
                  </span>
                  <span>
                    <strong>{accountLabel}</strong>
                    <small>{user ? user.email : "Sign in to save cart"}</small>
                  </span>
                </Link>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => {
              closeShopMenu();
              toggleMobileMenu();
            }}
          >
            <span className="sr-only">Menu</span>
            <span className="site-header__menu-icon" aria-hidden="true">
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <nav id="mobile-nav" className="site-header__mobile" aria-label="Mobile">
          {navigation.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openMobileSection === item.id;

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.id} className="site-header__mobile-group">
                <button
                  type="button"
                  className="site-header__mobile-trigger"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenMobileSection((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {isOpen ? "expand_less" : "expand_more"}
                  </span>
                </button>
                {isOpen ? (
                  <div className="site-header__mobile-submenu">
                    {item.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        onClick={closeMobileMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className="site-header__mobile-shop">
            <p>Shop starch</p>
            <div className="site-header__mobile-shop-icons">
              <Link href="/shop" onClick={closeMobileMenu} aria-label="Browse shop">
                <span className="material-symbols-outlined" aria-hidden="true">
                  storefront
                </span>
                Shop
              </Link>
              <Link href="/shop/cart" onClick={closeMobileMenu} aria-label="Cart">
                <span className="material-symbols-outlined" aria-hidden="true">
                  shopping_cart
                </span>
                Cart{cartBadge > 0 ? ` (${cartBadge})` : ""}
              </Link>
              <Link
                href="/shop/wishlist"
                onClick={closeMobileMenu}
                aria-label="Wishlist"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  favorite
                </span>
                Wishlist{wishCount > 0 ? ` (${wishCount})` : ""}
              </Link>
              <Link href={accountHref} onClick={closeMobileMenu} aria-label={accountLabel}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {user ? "account_circle" : "person"}
                </span>
                {accountLabel}
              </Link>
            </div>
          </div>
          <Link href="/shop/orders" onClick={closeMobileMenu}>
            Order history
          </Link>
          <Link
            href="/contact#sample"
            className="btn btn--primary"
            onClick={closeMobileMenu}
          >
            Request a Sample
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

function NavItemDesktop({
  item,
  isOpen,
  showDivider,
  onOpen,
  onClose,
  onToggle,
}: {
  item: NavItem;
  isOpen: boolean;
  showDivider: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <>
      <div
        className={`site-header__nav-item${isOpen ? " is-open" : ""}${hasChildren ? " has-dropdown" : ""}`}
        onMouseEnter={() => {
          if (hasChildren) onOpen();
        }}
        onMouseLeave={() => {
          if (hasChildren) onClose();
        }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="site-header__nav-trigger"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={onToggle}
          >
            <span>{item.label}</span>
            <span className="site-header__chevron" aria-hidden="true">
              <span className="material-symbols-outlined">
                {isOpen ? "expand_less" : "expand_more"}
              </span>
            </span>
          </button>
        ) : (
          <Link href={item.href} className="site-header__nav-link">
            {item.label}
          </Link>
        )}

        {hasChildren && isOpen ? (
          <div className="site-header__dropdown" role="menu">
            {item.children?.map((child) => (
              <Link
                key={child.id}
                href={child.href}
                role="menuitem"
                onClick={onClose}
              >
                {child.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {showDivider ? (
        <span className="site-header__divider" aria-hidden="true">
          |
        </span>
      ) : null}
    </>
  );
}
