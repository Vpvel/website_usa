"use client";

import Image from "next/image";
import Link from "next/link";
import type { AboutContent } from "@/domain/entities/about-content";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";

export function AboutPageView({
  site,
  about,
}: {
  site: HomeContent;
  about: AboutContent;
}) {
  const vm = useHomeViewModel(site);

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
      <main className="about-page">
        <section className="about-hero">
          <Image
            src={about.heroImageSrc}
            alt={about.heroImageAlt}
            fill
            priority
            className="about-hero__image"
            sizes="100vw"
          />
          <div className="about-hero__overlay" />
          <div className="about-hero__copy reveal" data-reveal>
            <nav className="about-hero__crumbs" aria-label="Breadcrumb">
              {about.breadcrumbs.map((crumb, index) => {
                const isLast = index === about.breadcrumbs.length - 1;
                return (
                  <span key={`${crumb.label}-${index}`}>
                    {index > 0 ? <span aria-hidden="true"> &gt; </span> : null}
                    {crumb.href && !isLast ? (
                      <Link href={crumb.href}>{crumb.label}</Link>
                    ) : (
                      <strong>{crumb.label}</strong>
                    )}
                  </span>
                );
              })}
            </nav>
            <h1>{about.heroTitle}</h1>
            <p>{about.heroSubtitle}</p>
          </div>
        </section>

        <section className="about-story">
          <div className="about-story__media reveal" data-reveal>
            <Image
              src={about.heroImageSrc}
              alt={about.heroImageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
          <div className="about-story__copy">
            {about.story.map((paragraph, index) => (
              <p
                key={paragraph}
                className="reveal"
                data-reveal
                data-reveal-delay={String(index * 120)}
              >
                {paragraph}
              </p>
            ))}
            <p
              className="about-story__membership reveal"
              data-reveal
              data-reveal-delay="360"
            >
              {about.membership}
            </p>
          </div>
        </section>

        <section className="about-leadership reveal" data-reveal>
          <p className="about-leadership__eyebrow">Leadership</p>
          <h2>{about.leadership.name}</h2>
          <p className="about-leadership__experience">
            {about.leadership.experience}
          </p>
          <p>{about.leadership.statement}</p>
        </section>

        <section className="about-split" aria-label="Infrastructure and quality">
          <article className="about-panel about-panel--infra reveal" data-reveal>
            <div className="about-panel__head">
              <span className="about-panel__icon" aria-hidden="true">
                <span className="material-symbols-outlined">apartment</span>
              </span>
              <div>
                <p className="about-panel__eyebrow">Capabilities</p>
                <h2>{about.infrastructure.headline}</h2>
              </div>
            </div>
            <ul className="about-feature-list">
              {about.infrastructure.points.map((point, index) => {
                const icons = [
                  "precision_manufacturing",
                  "science",
                  "warehouse",
                  "inventory_2",
                ];
                return (
                  <li
                    key={point}
                    className="about-feature-list__item reveal"
                    data-reveal
                    data-reveal-delay={String(index * 90)}
                  >
                    <span className="about-feature-list__icon" aria-hidden="true">
                      <span className="material-symbols-outlined">
                        {icons[index] ?? "check_circle"}
                      </span>
                    </span>
                    <span>{point}</span>
                  </li>
                );
              })}
            </ul>
          </article>

          <article
            className="about-panel about-panel--quality reveal"
            data-reveal
            data-reveal-delay="120"
          >
            <div className="about-panel__head">
              <span className="about-panel__icon about-panel__icon--quality" aria-hidden="true">
                <span className="material-symbols-outlined">verified</span>
              </span>
              <div>
                <p className="about-panel__eyebrow">Assurance</p>
                <h2>{about.quality.headline}</h2>
              </div>
            </div>
            <p className="about-panel__body">{about.quality.body}</p>
            <ul className="about-check-list">
              {about.quality.checks.map((check, index) => (
                <li
                  key={check}
                  className="about-check-list__item reveal"
                  data-reveal
                  data-reveal-delay={String(120 + index * 90)}
                >
                  <span className="about-check-list__mark" aria-hidden="true">
                    <span className="material-symbols-outlined">check_circle</span>
                  </span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="about-sectors">
          <h2 className="reveal" data-reveal>
            {about.sectorsHeadline}
          </h2>
          <div className="about-sectors__grid">
            {about.sectors.map((sector, index) => (
              <article
                key={sector}
                className="about-sector-card reveal"
                data-reveal
                data-reveal-delay={String((index % 5) * 70)}
              >
                <h3>{sector}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="about-markets reveal" data-reveal>
          <h2>{about.markets.headline}</h2>
          <p>{about.markets.body}</p>
          <Link href="/contact" className="btn btn--primary btn--lg">
            Partner with us
          </Link>
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
