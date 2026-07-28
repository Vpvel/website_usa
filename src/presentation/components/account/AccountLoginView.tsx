"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useAuth } from "@/presentation/context/AuthContext";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";

export function AccountLoginView({ site }: { site: HomeContent }) {
  const vm = useHomeViewModel(site);
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = login({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/account/profile");
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
      <main className="account-page">
        <section className="account-card reveal" data-reveal>
          <p className="account-card__eyebrow">Account</p>
          <h1>Sign in</h1>
          <p className="account-card__lead">
            Access your local profile and keep your starch cart saved in this
            browser.
          </p>
          {error ? <p className="account-card__error" role="alert">{error}</p> : null}
          <form className="account-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="current-password"
              />
            </label>
            <button type="submit" className="btn btn--primary">
              Sign in
            </button>
          </form>
          <p className="account-card__footer">
            New here? <Link href="/account/register">Create an account</Link>
          </p>
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
