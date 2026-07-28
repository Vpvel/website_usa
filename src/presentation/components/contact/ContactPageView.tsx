"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import type { ContactContent } from "@/domain/entities/contact-content";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";

export function ContactPageView({
  site,
  contact,
}: {
  site: HomeContent;
  contact: ContactContent;
}) {
  const vm = useHomeViewModel(site);
  const [sampleSent, setSampleSent] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const usaOffice = contact.offices[0];

  function handleSampleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSampleSent(true);
    event.currentTarget.reset();
  }

  function handleMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessageSent(true);
    event.currentTarget.reset();
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
      <main className="contact-page">
        <section className="contact-hero reveal" data-reveal>
          <nav className="contact-hero__crumbs" aria-label="Breadcrumb">
            {contact.breadcrumbs.map((crumb, index) => {
              const isLast = index === contact.breadcrumbs.length - 1;
              return (
                <span key={`${crumb.label}-${index}`}>
                  {index > 0 ? <span aria-hidden="true"> / </span> : null}
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </span>
              );
            })}
          </nav>
          <h1>{contact.heroTitle}</h1>
          <p>{contact.heroSubtitle}</p>
        </section>

        <section className="contact-layout" aria-label="Contact details and forms">
          <aside className="contact-offices reveal" data-reveal>
            {contact.offices.map((office) => (
              <article key={office.label} className="contact-office">
                <p className="contact-office__eyebrow">{office.label}</p>
                <h2>{office.companyLine}</h2>
                <address>
                  {office.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <ul className="contact-office__links">
                  <li>
                    <a href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        call
                      </span>
                      {office.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${office.email}`}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        mail
                      </span>
                      {office.email}
                    </a>
                  </li>
                </ul>
              </article>
            ))}

            <div className="contact-map-card">
              <p className="contact-office__eyebrow">USA sample address</p>
              <h3>{usaOffice.companyLine}</h3>
              <p>
                {usaOffice.lines.join(", ")}
              </p>
              <a
                className="btn btn--ghost"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${usaOffice.companyLine}, ${usaOffice.lines.join(", ")}`,
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps
              </a>
            </div>
          </aside>

          <div className="contact-forms">
            <section
              id="sample"
              className="contact-form-card reveal"
              data-reveal
              data-reveal-delay="80"
            >
              <h2>{contact.sampleForm.headline}</h2>
              <p>{contact.sampleForm.body}</p>
              {sampleSent ? (
                <p className="contact-form-card__success" role="status">
                  {contact.sampleForm.successMessage}
                </p>
              ) : null}
              <form className="contact-form" onSubmit={handleSampleSubmit}>
                <div className="contact-form__row">
                  <label>
                    Full name
                    <input name="name" type="text" required autoComplete="name" />
                  </label>
                  <label>
                    Company
                    <input name="company" type="text" required autoComplete="organization" />
                  </label>
                </div>
                <div className="contact-form__row">
                  <label>
                    Work email
                    <input name="email" type="email" required autoComplete="email" />
                  </label>
                  <label>
                    Phone
                    <input name="phone" type="tel" autoComplete="tel" />
                  </label>
                </div>
                <label>
                  Product / application interest
                  <input name="interest" type="text" required />
                </label>
                <label>
                  Sample notes
                  <textarea name="notes" rows={4} placeholder="Volume, process conditions, target texture…" />
                </label>
                <button type="submit" className="btn btn--primary">
                  Submit sample request
                </button>
              </form>
            </section>

            <section
              className="contact-form-card reveal"
              data-reveal
              data-reveal-delay="140"
            >
              <h2>{contact.generalForm.headline}</h2>
              <p>{contact.generalForm.body}</p>
              {messageSent ? (
                <p className="contact-form-card__success" role="status">
                  Message sent. We will get back to you soon.
                </p>
              ) : null}
              <form className="contact-form" onSubmit={handleMessageSubmit}>
                <div className="contact-form__row">
                  <label>
                    Full name
                    <input name="name" type="text" required autoComplete="name" />
                  </label>
                  <label>
                    Email
                    <input name="email" type="email" required autoComplete="email" />
                  </label>
                </div>
                <label>
                  Message
                  <textarea name="message" rows={5} required />
                </label>
                <button type="submit" className="btn btn--primary">
                  Send message
                </button>
              </form>
            </section>
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
