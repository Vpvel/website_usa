"use client";

import Link from "next/link";
import type { CertificationsContent } from "@/domain/entities/certification";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";
import { CertificationsSection } from "@/presentation/components/shared/CertificationsSection";

const resourceSections = [
  {
    id: "tds",
    title: "Technical Data Sheets",
    body: "Request product TDS and specification sheets for formulation and QA review.",
  },
  {
    id: "brochures",
    title: "Product Brochures",
    body: "Category overviews for native starch, organic cassava flour, sweeteners, clean-label, and modified starch.",
  },
  {
    id: "faq",
    title: "FAQ",
    body: "Common questions on sampling, MOQ, packaging, documentation, and US supply.",
  },
  {
    id: "knowledge",
    title: "Knowledge Center",
    body: "Application notes and clean-label formulation guidance for bakery, dairy, sauces, and snacks.",
  },
  {
    id: "blog",
    title: "Blog",
    body: "Updates on starch innovation, organic ingredients, and manufacturing best practices.",
  },
] as const;

export function ResourcesPageView({
  site,
  certifications,
}: {
  site: HomeContent;
  certifications: CertificationsContent;
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

      <main className="resources-page">
        <header className="resources-page__hero">
          <p className="resources-page__eyebrow">Resources</p>
          <h1>Technical resources & certifications</h1>
          <p>
            Access documentation support and review Angel Starch quality,
            food-safety, organic, and trade certifications.
          </p>
        </header>

        <CertificationsSection content={certifications} />

        <section className="resources-grid" aria-label="Resource topics">
          {resourceSections.map((section) => (
            <article key={section.id} id={section.id} className="resources-card">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <Link href="/contact" className="btn btn--ghost">
                Contact us
              </Link>
            </article>
          ))}
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
