"use client";

import type { HomeContent } from "@/domain/entities/home-content";
import type { CertificationsContent } from "@/domain/entities/certification";
import { useHomeViewModel } from "@/presentation/viewmodels/useHomeViewModel";
import { useDynamicHome } from "@/presentation/context/DynamicContentContext";
import { SiteHeader } from "@/presentation/components/layout/SiteHeader";
import { SiteFooter } from "@/presentation/components/layout/SiteFooter";
import { HeroSection } from "@/presentation/components/home/HeroSection";
import { ApplicationsSection } from "@/presentation/components/home/ApplicationsSection";
import { StatsSection } from "@/presentation/components/home/StatsSection";
import { WhyPartnerSection } from "@/presentation/components/home/WhyPartnerSection";
import { FavoritesSection } from "@/presentation/components/home/FavoritesSection";
import { CertificationsSection } from "@/presentation/components/shared/CertificationsSection";
import { RevealOnScroll } from "@/presentation/components/RevealOnScroll";

export function HomePageView({
  content,
  certifications,
}: {
  content: HomeContent;
  certifications: CertificationsContent;
}) {
  const dynamicContent = useDynamicHome(content);
  const vm = useHomeViewModel(dynamicContent);

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
        <WhyPartnerSection whyPartner={vm.whyPartner} />
        <StatsSection stats={vm.stats} />
        <CertificationsSection content={certifications} />
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
