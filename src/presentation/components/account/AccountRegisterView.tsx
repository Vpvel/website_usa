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

export function AccountRegisterView({ site }: { site: HomeContent }) {
  const vm = useHomeViewModel(site);
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = register({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      company: String(form.get("company") ?? ""),
      phone: String(form.get("phone") ?? ""),
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
          <h1>Create account</h1>
          <p className="account-card__lead">
            Local browser account for profile and cart — no server signup
            required.
          </p>
          {error ? <p className="account-card__error" role="alert">{error}</p> : null}
          <form className="account-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input name="name" type="text" required autoComplete="name" />
            </label>
            <label>
              Work email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <div className="account-form__row">
              <label>
                Company
                <input name="company" type="text" autoComplete="organization" />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
            </div>
            <label>
              Password
              <input
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </label>
            <button type="submit" className="btn btn--primary">
              Create account
            </button>
          </form>
          <p className="account-card__footer">
            Already registered? <Link href="/account/login">Sign in</Link>
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
