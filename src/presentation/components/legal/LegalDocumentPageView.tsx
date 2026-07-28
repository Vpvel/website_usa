"use client";

import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";
import type { LegalDocument } from "@/domain/entities/legal-document";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";

export function LegalDocumentPageView({
  site,
  document,
}: {
  site: HomeContent;
  document: LegalDocument;
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
      <main className="legal-page">
        <article className="legal-doc reveal" data-reveal>
          <nav className="legal-doc__crumbs" aria-label="Breadcrumb">
            <Link href="/">Angel Starch</Link>
            <span aria-hidden="true"> / </span>
            <span>{document.title}</span>
          </nav>
          <header className="legal-doc__header">
            <h1>{document.title}</h1>
            <p className="legal-doc__updated">Last updated: {document.lastUpdated}</p>
          </header>

          {document.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}

          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className="legal-doc__section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 64)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section id="contact" className="legal-doc__section">
            <h2>Contact</h2>
            <p>
              {document.contactNote}{" "}
              <a href={`mailto:${document.contactEmail}`}>{document.contactEmail}</a>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
