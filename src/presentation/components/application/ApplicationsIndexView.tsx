"use client";

import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";

export function ApplicationsIndexView({ site }: { site: HomeContent }) {
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
      <main className="section applications">
        <div className="section__intro reveal" data-reveal>
          <h2>Applications</h2>
          <p>
            Explore starch solutions for bakery, dairy, sauces, meat & poultry,
            snacks, and beverages.
          </p>
        </div>
        <div className="applications__grid">
          {vm.applications.map((app, index) => (
            <article
              key={app.id}
              className="application-tile reveal"
              data-reveal
              data-reveal-delay={String(index * 100)}
            >
              <div className="application-tile__media">
                <Image
                  src={app.imageSrc}
                  alt={app.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="application-tile__body">
                <h3>{app.title}</h3>
                <p>{app.description}</p>
                <Link href={app.href}>
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
