"use client";

import { useEffect, useState, type RefObject } from "react";
import type { HomeContent } from "@/domain/entities/home-content";

export interface HomeViewState {
  brandName: string;
  tagline: string;
  navigation: HomeContent["navigation"];
  hero: HomeContent["hero"];
  trustFeatures: HomeContent["trustFeatures"];
  applications: HomeContent["applications"];
  products: HomeContent["products"];
  stats: HomeContent["stats"];
  whyPartner: HomeContent["whyPartner"];
  favorites: HomeContent["favorites"];
  isMobileMenuOpen: boolean;
  openDropdownId: string | null;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openDropdown: (id: string) => void;
  closeDropdown: () => void;
  toggleDropdown: (id: string) => void;
}

/**
 * MVVM ViewModel: maps domain HomeContent into view-ready state
 * and owns presentation-only UI state (mobile + desktop navigation).
 */
export function useHomeViewModel(content: HomeContent): HomeViewState {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return {
    brandName: content.brandName,
    tagline: content.tagline,
    navigation: content.navigation,
    hero: content.hero,
    trustFeatures: content.trustFeatures,
    applications: content.applications,
    products: content.products,
    stats: content.stats,
    whyPartner: content.whyPartner,
    favorites: content.favorites,
    isMobileMenuOpen,
    openDropdownId,
    openMobileMenu: () => setIsMobileMenuOpen(true),
    closeMobileMenu: () => {
      setIsMobileMenuOpen(false);
      setOpenDropdownId(null);
    },
    toggleMobileMenu: () =>
      setIsMobileMenuOpen((open) => {
        if (open) setOpenDropdownId(null);
        return !open;
      }),
    openDropdown: (id: string) => setOpenDropdownId(id),
    closeDropdown: () => setOpenDropdownId(null),
    toggleDropdown: (id: string) =>
      setOpenDropdownId((current) => (current === id ? null : id)),
  };
}

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutside: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const handlePointer = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onOutside();
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOutside();
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [ref, onOutside, enabled]);
}
