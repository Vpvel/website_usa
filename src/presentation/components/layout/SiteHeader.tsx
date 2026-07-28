"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/domain/entities/nav-item";
import type { HomeViewState } from "@/presentation/viewmodels/useHomeViewModel";
import { useClickOutside } from "@/presentation/viewmodels/useHomeViewModel";
import { useCart } from "@/presentation/context/CartContext";

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
  const { itemCount } = useCart();

  useClickOutside(navRef, closeDropdown, openDropdownId !== null);

  return (
    <header className="site-header" ref={navRef}>
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand" onClick={closeMobileMenu}>
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
              onOpen={() => openDropdown(item.id)}
              onClose={closeDropdown}
              onToggle={() => toggleDropdown(item.id)}
            />
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/contact#sample" className="btn btn--primary">
            Request a Sample
          </Link>
          <Link href="/shop" className="btn btn--ghost shop-link">
            Shop starch
            {itemCount > 0 ? (
              <span className="shop-link__badge">{itemCount}</span>
            ) : null}
          </Link>
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={toggleMobileMenu}
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
            Shop starch{itemCount > 0 ? ` (${itemCount} kg)` : ""}
          </Link>
          <Link href="/shop/cart" onClick={closeMobileMenu}>
            Cart
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
