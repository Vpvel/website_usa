"use client";

import { type FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useAuth } from "@/presentation/context/AuthContext";
import { useCart } from "@/presentation/context/CartContext";
import { useOrders } from "@/presentation/context/OrdersContext";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function ShopCheckoutView({ site }: { site: HomeContent }) {
  const vm = useHomeViewModel(site);
  const router = useRouter();
  const { user } = useAuth();
  const { items, itemCount, subtotal, clearCart } = useCart();
  const { addresses, placeOrder } = useOrders();
  const defaultAddress = useMemo(
    () => addresses.find((item) => item.isDefault) ?? addresses[0] ?? null,
    [addresses],
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeAddressId = selectedAddressId ?? defaultAddress?.id ?? "new";

  const selectedSaved =
    activeAddressId === "new"
      ? null
      : addresses.find((item) => item.id === activeAddressId) ?? null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const saveAddress = form.get("saveAddress") === "on";

    const address = selectedSaved
      ? {
          fullName: selectedSaved.fullName,
          company: selectedSaved.company,
          phone: selectedSaved.phone,
          email: selectedSaved.email,
          line1: selectedSaved.line1,
          line2: selectedSaved.line2,
          city: selectedSaved.city,
          state: selectedSaved.state,
          postalCode: selectedSaved.postalCode,
          country: selectedSaved.country,
        }
      : {
          fullName: String(form.get("fullName") ?? ""),
          company: String(form.get("company") ?? ""),
          phone: String(form.get("phone") ?? ""),
          email: String(form.get("email") ?? ""),
          line1: String(form.get("line1") ?? ""),
          line2: String(form.get("line2") ?? ""),
          city: String(form.get("city") ?? ""),
          state: String(form.get("state") ?? ""),
          postalCode: String(form.get("postalCode") ?? ""),
          country: String(form.get("country") ?? "United States"),
        };

    if (
      !address.fullName ||
      !address.email ||
      !address.phone ||
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      setError("Please complete the required shipping address fields.");
      return;
    }

    const order = placeOrder({
      address,
      items,
      note: String(form.get("note") ?? ""),
      saveAddress: !selectedSaved && saveAddress,
    });

    clearCart();
    router.push(`/shop/orders?placed=${order.id}`);
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
      <main className="shop-checkout">
        <div className="shop-cart__header">
          <h1>Checkout</h1>
          <p>Add a US shipping address and submit your local order request.</p>
        </div>

        {items.length === 0 ? (
          <div className="shop-cart__empty">
            <p>No items to check out.</p>
            <Link href="/shop" className="btn btn--primary">
              Back to shop
            </Link>
          </div>
        ) : (
          <div className="shop-checkout__layout">
            <form
              id="checkout-form"
              className="account-card account-form shop-checkout__form"
              onSubmit={handleSubmit}
            >
              <h2>Shipping address</h2>
              {error ? (
                <p className="account-card__error" role="alert">
                  {error}
                </p>
              ) : null}

              {addresses.length > 0 ? (
                <label>
                  Saved addresses
                  <select
                    value={activeAddressId}
                    onChange={(event) => setSelectedAddressId(event.target.value)}
                  >
                    {addresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.fullName} — {address.line1}, {address.city}
                        {address.isDefault ? " (default)" : ""}
                      </option>
                    ))}
                    <option value="new">Use a new address</option>
                  </select>
                </label>
              ) : null}

              {!selectedSaved ? (
                <>
                  <div className="account-form__row">
                    <label>
                      Full name
                      <input
                        name="fullName"
                        required
                        defaultValue={user?.name ?? ""}
                        autoComplete="name"
                      />
                    </label>
                    <label>
                      Company
                      <input
                        name="company"
                        defaultValue={user?.company ?? ""}
                        autoComplete="organization"
                      />
                    </label>
                  </div>
                  <div className="account-form__row">
                    <label>
                      Email
                      <input
                        name="email"
                        type="email"
                        required
                        defaultValue={user?.email ?? ""}
                        autoComplete="email"
                      />
                    </label>
                    <label>
                      Phone
                      <input
                        name="phone"
                        type="tel"
                        required
                        defaultValue={user?.phone ?? ""}
                        autoComplete="tel"
                      />
                    </label>
                  </div>
                  <label>
                    Address line 1
                    <input name="line1" required autoComplete="address-line1" />
                  </label>
                  <label>
                    Address line 2
                    <input name="line2" autoComplete="address-line2" />
                  </label>
                  <div className="account-form__row">
                    <label>
                      City
                      <input name="city" required autoComplete="address-level2" />
                    </label>
                    <label>
                      State
                      <input name="state" required autoComplete="address-level1" />
                    </label>
                  </div>
                  <div className="account-form__row">
                    <label>
                      ZIP / Postal code
                      <input
                        name="postalCode"
                        required
                        autoComplete="postal-code"
                      />
                    </label>
                    <label>
                      Country
                      <input
                        name="country"
                        defaultValue="United States"
                        autoComplete="country-name"
                      />
                    </label>
                  </div>
                  <label className="shop-checkout__check">
                    <input name="saveAddress" type="checkbox" defaultChecked />
                    Save this address locally for next time
                  </label>
                </>
              ) : (
                <div className="shop-checkout__saved">
                  <p>
                    <strong>{selectedSaved.fullName}</strong>
                    {selectedSaved.company ? ` · ${selectedSaved.company}` : ""}
                  </p>
                  <p>{selectedSaved.line1}</p>
                  {selectedSaved.line2 ? <p>{selectedSaved.line2}</p> : null}
                  <p>
                    {selectedSaved.city}, {selectedSaved.state}{" "}
                    {selectedSaved.postalCode}
                  </p>
                  <p>{selectedSaved.country}</p>
                  <p>
                    {selectedSaved.phone} · {selectedSaved.email}
                  </p>
                </div>
              )}

              <label>
                Order notes
                <textarea
                  name="note"
                  rows={3}
                  placeholder="Packaging, delivery window, sample needs…"
                />
              </label>

              <button type="submit" className="btn btn--primary btn--lg shop-checkout__form-submit">
                Place order request
              </button>
            </form>

            <aside className="shop-checkout__summary">
              <p className="shop-checkout__summary-eyebrow">Review</p>
              <h2>Order summary</h2>

              <ul className="shop-checkout__items">
                {items.map((item) => (
                  <li key={item.product.id}>
                    <div>
                      <span className="shop-checkout__item-name">
                        {item.product.shortName}
                      </span>
                      <span className="shop-checkout__item-qty">
                        {item.quantityKg} kg · {formatUsd(item.product.pricePerKg)}
                        /kg
                      </span>
                    </div>
                    <strong>
                      {formatUsd(item.quantityKg * item.product.pricePerKg)}
                    </strong>
                  </li>
                ))}
              </ul>

              <dl className="shop-checkout__totals">
                <div>
                  <dt>Products</dt>
                  <dd>{items.length}</dd>
                </div>
                <div>
                  <dt>Total volume</dt>
                  <dd>{itemCount} kg</dd>
                </div>
                <div className="shop-checkout__totals-subtotal">
                  <dt>Estimated subtotal</dt>
                  <dd>{formatUsd(subtotal)}</dd>
                </div>
              </dl>

              <p className="shop-checkout__summary-note">
                Submit the form to place a local order request with this shipping
                address.
              </p>

              <div className="shop-checkout__summary-actions">
                <button type="submit" form="checkout-form" className="btn btn--primary btn--lg">
                  Place order request
                </button>
                <Link href="/shop/cart" className="btn btn--ghost">
                  Back to cart
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
