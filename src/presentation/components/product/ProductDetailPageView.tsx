"use client";

import type { HomeContent } from "@/domain/entities/home-content";
import type { ProductDetail } from "@/domain/entities/product-detail";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { ProductDetailHero } from "@/presentation/components/product/ProductDetailHero";

export function ProductDetailPageView({
  site,
  product,
}: {
  site: HomeContent;
  product: ProductDetail;
}) {
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
      <main>
        <ProductDetailHero product={product} />
      </main>
      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
