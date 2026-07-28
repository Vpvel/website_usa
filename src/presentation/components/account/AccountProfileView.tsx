"use client";

import { type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useAuth } from "@/presentation/context/AuthContext";
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

export function AccountProfileView({ site }: { site: HomeContent }) {
  const vm = useHomeViewModel(site);
  const { user, hydrated, updateProfile, logout } = useAuth();
  const { itemCount, subtotal } = useCart();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/account/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
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
        <main className="account-page">
          <p className="account-card__lead">Loading profile…</p>
        </main>
      </>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = updateProfile({
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      phone: String(form.get("phone") ?? ""),
    });
    if (!result.ok) {
      setError(result.error);
      setMessage(null);
      return;
    }
    setError(null);
    setMessage("Profile saved locally.");
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
      <main className="account-page account-page--wide">
        <section className="account-profile reveal" data-reveal>
          <header className="account-profile__header">
            <div>
              <p className="account-card__eyebrow">Profile</p>
              <h1>{user.name}</h1>
              <p className="account-card__lead">{user.email}</p>
            </div>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Sign out
            </button>
          </header>

          <div className="account-profile__grid">
            <form className="account-card account-form" onSubmit={handleSubmit}>
              <h2>Account details</h2>
              {message ? (
                <p className="account-card__success" role="status">
                  {message}
                </p>
              ) : null}
              {error ? (
                <p className="account-card__error" role="alert">
                  {error}
                </p>
              ) : null}
              <label>
                Full name
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={user.name}
                  autoComplete="name"
                />
              </label>
              <label>
                Email
                <input type="email" value={user.email} disabled />
              </label>
              <div className="account-form__row">
                <label>
                  Company
                  <input
                    name="company"
                    type="text"
                    defaultValue={user.company}
                    autoComplete="organization"
                  />
                </label>
                <label>
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    defaultValue={user.phone}
                    autoComplete="tel"
                  />
                </label>
              </div>
              <button type="submit" className="btn btn--primary">
                Save profile
              </button>
            </form>

            <aside className="account-card">
              <h2>Your cart</h2>
              <p className="account-card__lead">
                Cart, wishlist, and orders are saved locally for your signed-in
                session in this browser.
              </p>
              <dl className="account-stats">
                <div>
                  <dt>Items</dt>
                  <dd>{itemCount} kg</dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatUsd(subtotal)}</dd>
                </div>
              </dl>
              <div className="account-card__actions">
                <Link href="/shop" className="btn btn--primary">
                  Continue shopping
                </Link>
                <Link href="/shop/cart" className="btn btn--ghost">
                  View cart
                </Link>
                <Link href="/shop/wishlist" className="btn btn--ghost">
                  Wishlist
                </Link>
                <Link href="/shop/orders" className="btn btn--ghost">
                  Orders
                </Link>
              </div>
            </aside>
          </div>
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
