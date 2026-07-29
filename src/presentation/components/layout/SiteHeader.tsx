"use client";

import { useEffect, useRef, useState } from "react";
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
  const shopMenuRef = useRef<HTMLDivElement>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const { itemCount, items } = useCart();
  const { user, logout } = useAuth();
  const { count: wishCount } = useWishlist();
  const cartProductCount = items.length;
  const cartBadge = cartProductCount > 0 ? cartProductCount : 0;

  useClickOutside(navRef, closeDropdown, openDropdownId !== null);

  useEffect(() => {
    if (!isShopMenuOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (shopMenuRef.current && !shopMenuRef.current.contains(target)) {
        setIsShopMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsShopMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isShopMenuOpen]);

  const accountName = user ? user.name.split(" ")[0] : "Guest";

  function closeShopMenu() {
    setIsShopMenuOpen(false);
  }

  function handleSignOut() {
    logout();
    closeShopMenu();
    closeMobileMenu();
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

          <div
            className={`site-header__shop${isShopMenuOpen ? " is-open" : ""}`}
            ref={shopMenuRef}
          >
            <div className="site-header__shop-trigger">
              <Link
                href="/shop"
                className="btn btn--ghost shop-link"
                onClick={() => {
                  closeDropdown();
                  closeShopMenu();
                }}
              >
                Shop starch
                {user && (cartBadge > 0 || wishCount > 0) ? (
                  <span className="shop-link__badge">
                    {cartBadge + wishCount}
                  </span>
                ) : null}
              </Link>
              <button
                type="button"
                className="site-header__shop-toggle"
                aria-expanded={isShopMenuOpen}
                aria-haspopup="true"
                aria-controls="shop-quick-menu"
                aria-label={user ? "Open account menu" : "Open menu"}
                onClick={() => {
                  closeDropdown();
                  setIsShopMenuOpen((open) => !open);
                }}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {isShopMenuOpen ? "expand_less" : "expand_more"}
                </span>
              </button>
            </div>

            {isShopMenuOpen ? (
              <div
                id="shop-quick-menu"
                className="site-header__shop-menu"
                role="menu"
                aria-label={user ? "Account menu" : "Shop menu"}
              >
                {user ? (
                  <>
                    <Link
                      href="/shop/cart"
                      className="site-header__shop-item"
                      role="menuitem"
                      onClick={closeShopMenu}
                    >
                      <span className="site-header__shop-icon" aria-hidden="true">
                        <span className="material-symbols-outlined">
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
                      <span className="site-header__shop-icon" aria-hidden="true">
                        <span className="material-symbols-outlined">favorite</span>
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
                      href="/shop/orders"
                      className="site-header__shop-item"
                      role="menuitem"
                      onClick={closeShopMenu}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        receipt_long
                      </span>
                      <span>
                        <strong>Order history</strong>
                        <small>Past orders</small>
                      </span>
                    </Link>

                    <Link
                      href="/account/profile"
                      className="site-header__shop-item"
                      role="menuitem"
                      onClick={closeShopMenu}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        account_circle
                      </span>
                      <span>
                        <strong>Profile</strong>
                        <small>{accountName}</small>
                      </span>
                    </Link>

                    <button
                      type="button"
                      className="site-header__shop-item site-header__shop-item--button"
                      role="menuitem"
                      onClick={handleSignOut}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        logout
                      </span>
                      <span>
                        <strong>Sign out</strong>
                        <small>End this session</small>
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/"
                      className="site-header__shop-item"
                      role="menuitem"
                      onClick={closeShopMenu}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        home
                      </span>
                      <span>
                        <strong>Home</strong>
                        <small>Back to homepage</small>
                      </span>
                    </Link>

                    <Link
                      href="/about"
                      className="site-header__shop-item"
                      role="menuitem"
                      onClick={closeShopMenu}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        info
                      </span>
                      <span>
                        <strong>About Us</strong>
                        <small>Company & quality</small>
                      </span>
                    </Link>

                    <Link
                      href="/products"
                      className="site-header__shop-item"
                      role="menuitem"
                      onClick={closeShopMenu}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        inventory_2
                      </span>
                      <span>
                        <strong>Products</strong>
                        <small>Starch catalog</small>
                      </span>
                    </Link>

                    <Link
                      href="/account/login"
                      className="site-header__shop-item"
                      role="menuitem"
                      onClick={closeShopMenu}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        person
                      </span>
                      <span>
                        <strong>Sign in</strong>
                        <small>Access cart & orders</small>
                      </span>
                    </Link>
                  </>
                )}
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
          <Link href="/shop" onClick={closeMobileMenu}>
            Shop starch
          </Link>
          {user ? (
            <>
              <Link href="/shop/cart" onClick={closeMobileMenu}>
                Cart
                {cartProductCount > 0
                  ? ` (${cartProductCount} · ${itemCount} kg)`
                  : ""}
              </Link>
              <Link href="/shop/wishlist" onClick={closeMobileMenu}>
                Wishlist{wishCount > 0 ? ` (${wishCount})` : ""}
              </Link>
              <Link href="/shop/orders" onClick={closeMobileMenu}>
                Order history
              </Link>
              <Link href="/account/profile" onClick={closeMobileMenu}>
                Profile
              </Link>
              <button
                type="button"
                className="site-header__mobile-signout"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/" onClick={closeMobileMenu}>
                Home
              </Link>
              <Link href="/about" onClick={closeMobileMenu}>
                About Us
              </Link>
              <Link href="/products" onClick={closeMobileMenu}>
                Products
              </Link>
              <Link href="/account/login" onClick={closeMobileMenu}>
                Sign in
              </Link>
            </>
          )}
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
