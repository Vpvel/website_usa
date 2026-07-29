"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { HomeContent } from "@/domain/entities/home-content";
import type { AboutContent } from "@/domain/entities/about-content";
import type { ContactContent } from "@/domain/entities/contact-content";
import type { ShopCatalog, ShopProduct } from "@/domain/entities/shop-product";
import { homeContentLocal } from "@/data/datasources/home-content.local";
import { aboutContentLocal } from "@/data/datasources/about-content.local";
import { contactContentLocal } from "@/data/datasources/contact-content.local";
import { shopCatalogLocal } from "@/data/datasources/shop-catalog.local";
import { ADMIN_CONTENT_CHANGED_EVENT } from "@/data/datasources/admin-media.local";
import {
  readDynamicAboutContent,
  readDynamicContactContent,
  readDynamicHomeContent,
  readDynamicShopCatalog,
  readDynamicShopProduct,
} from "@/data/datasources/dynamic-content";

interface DynamicContentContextValue {
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  catalog: ShopCatalog;
  getProduct: (id: string, seed?: ShopProduct | null) => ShopProduct | null;
  refresh: () => void;
  hydrated: boolean;
}

const DynamicContentContext = createContext<DynamicContentContextValue | null>(
  null,
);

export function DynamicContentProvider({ children }: { children: ReactNode }) {
  const [home, setHome] = useState<HomeContent>(homeContentLocal);
  const [about, setAbout] = useState<AboutContent>(aboutContentLocal);
  const [contact, setContact] = useState<ContactContent>(contactContentLocal);
  const [catalog, setCatalog] = useState<ShopCatalog>(shopCatalogLocal);
  const [hydrated, setHydrated] = useState(false);

  const refresh = () => {
    setHome(readDynamicHomeContent(homeContentLocal));
    setAbout(readDynamicAboutContent(aboutContentLocal));
    setContact(readDynamicContactContent(contactContentLocal));
    setCatalog(readDynamicShopCatalog(shopCatalogLocal));
  };

  useEffect(() => {
    refresh();
    setHydrated(true);

    function onChange() {
      refresh();
    }

    window.addEventListener(ADMIN_CONTENT_CHANGED_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(ADMIN_CONTENT_CHANGED_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const value = useMemo<DynamicContentContextValue>(
    () => ({
      home,
      about,
      contact,
      catalog,
      hydrated,
      refresh,
      getProduct: (id, seed = null) => readDynamicShopProduct(id, seed),
    }),
    [home, about, contact, catalog, hydrated],
  );

  return (
    <DynamicContentContext.Provider value={value}>
      {children}
    </DynamicContentContext.Provider>
  );
}

export function useDynamicContent() {
  const context = useContext(DynamicContentContext);
  if (!context) {
    throw new Error("useDynamicContent must be used within DynamicContentProvider");
  }
  return context;
}

export function useDynamicHome(seed: HomeContent) {
  const { home, hydrated } = useDynamicContent();
  return hydrated ? home : seed;
}

export function useDynamicAbout(seed: AboutContent) {
  const { about, hydrated } = useDynamicContent();
  return hydrated ? about : seed;
}

export function useDynamicContact(seed: ContactContent) {
  const { contact, hydrated } = useDynamicContent();
  return hydrated ? contact : seed;
}

export function useDynamicCatalog(seed: ShopCatalog) {
  const { catalog, hydrated } = useDynamicContent();
  return hydrated ? catalog : seed;
}
