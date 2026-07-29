"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { BannerSlide } from "@/domain/entities/home-content";

const FALLBACK_BANNERS: BannerSlide[] = [
  {
    id: "shop-banner-1",
    imageSrc: "/images/shop_banner/shop_banner_1.png",
    imageAlt: "Angel Starch Pure Starch Pure Goodness — Organic Cassava Flour",
    sortOrder: 0,
    isPublished: true,
  },
  {
    id: "shop-banner-2",
    imageSrc: "/images/shop_banner/shop_banner_2.png",
    imageAlt: "Angel Starch Pure Starch Pure Goodness — Organic Corn Maltodextrin",
    sortOrder: 1,
    isPublished: true,
  },
];

export function ShopBannerSlider({
  banners,
}: {
  banners?: BannerSlide[];
}) {
  const slides = useMemo(() => {
    const source = (banners?.length ? banners : FALLBACK_BANNERS)
      .filter((item) => item.isPublished)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return source.length > 0 ? source : FALLBACK_BANNERS;
  }, [banners]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  return (
    <section
      className="shop-banner"
      aria-label="Shop banner slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shop-banner__track">
        {slides.map((banner, index) => (
          <div
            key={banner.id}
            className={`shop-banner__slide${index === activeIndex ? " is-active" : ""}`}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={banner.imageSrc}
              alt={banner.imageAlt}
              width={1920}
              height={900}
              priority={index === 0}
              className="shop-banner__image"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="shop-banner__dots" role="tablist" aria-label="Banner slides">
        {slides.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Show slide ${index + 1}`}
            className={`shop-banner__dot${index === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <button
        type="button"
        className="shop-banner__nav shop-banner__nav--prev"
        aria-label="Previous banner"
        onClick={() =>
          setActiveIndex(
            (current) => (current - 1 + slides.length) % slides.length,
          )
        }
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_left
        </span>
      </button>
      <button
        type="button"
        className="shop-banner__nav shop-banner__nav--next"
        aria-label="Next banner"
        onClick={() =>
          setActiveIndex((current) => (current + 1) % slides.length)
        }
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_right
        </span>
      </button>
    </section>
  );
}
