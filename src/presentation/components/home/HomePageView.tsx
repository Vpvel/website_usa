"use client";

import type { HomeContent } from "@/domain/entities/home-content";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { HeroSection } from "@/presentation/components/home/HeroSection";
import { ApplicationsSection } from "@/presentation/components/home/ApplicationsSection";
import { StatsSection } from "@/presentation/components/home/StatsSection";
import { WhyPartnerSection } from "@/presentation/components/home/WhyPartnerSection";
import { FavoritesSection } from "@/presentation/components/home/FavoritesSection";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";

export function HomePageView({ content }: { content: HomeContent }) {
  const vm = useHomeViewModel(content);

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
      <main>
        <HeroSection
          hero={vm.hero}
          products={vm.products}
          trustFeatures={vm.trustFeatures}
        />
        <ApplicationsSection applications={vm.applications} />
        <StatsSection stats={vm.stats} />
        <WhyPartnerSection whyPartner={vm.whyPartner} />
        <FavoritesSection favorites={vm.favorites} />
      </main>
      <SiteFooter
        brandName={vm.brandName}
        tagline={vm.tagline}
        navigation={vm.navigation}
      />
    </>
  );
}
