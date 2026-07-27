"use client";

import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";

export function ProductsIndexView({ site }: { site: HomeContent }) {
  const vm = useHomeViewModel(site);

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
      <main className="section products">
        <div className="section__intro">
          <h2>Products & capabilities</h2>
          <p>
            Explore native modified starches, custom formulation, and US supply
            built for industrial food manufacturers.
          </p>
        </div>
        <div className="products__grid">
          {vm.products.map((product) => (
            <article key={product.id} className="product-spotlight">
              <div className="product-spotlight__media">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="product-spotlight__body">
                <h3>{product.name}</h3>
                <p>{product.summary}</p>
                <Link href={product.href} className="btn btn--primary">
                  View details
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
