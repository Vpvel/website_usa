"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SHOP_BANNERS = [
  {
    id: "cassava",
    src: "/images/shop_banner/shop_banner_1.png",
    alt: "Angel Starch Pure Starch Pure Goodness — Organic Cassava Flour",
  },
  {
    id: "corn-maltodextrin",
    src: "/images/shop_banner/shop_banner_2.png",
    alt: "Angel Starch Pure Starch Pure Goodness — Organic Corn Maltodextrin",
  },
] as const;

export function ShopBannerSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (SHOP_BANNERS.length <= 1 || paused) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SHOP_BANNERS.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="shop-banner"
      aria-label="Shop banner slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shop-banner__track">
        {SHOP_BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            className={`shop-banner__slide${index === activeIndex ? " is-active" : ""}`}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={banner.src}
              alt={banner.alt}
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
        {SHOP_BANNERS.map((banner, index) => (
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
            (current) =>
              (current - 1 + SHOP_BANNERS.length) % SHOP_BANNERS.length,
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
          setActiveIndex((current) => (current + 1) % SHOP_BANNERS.length)
        }
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_right
        </span>
      </button>
    </section>
  );
}
