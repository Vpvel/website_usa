"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { HeroContent } from "@/domain/entities/home-content";
import type { Product } from "@/domain/entities/product";
import type { TrustFeature } from "@/domain/entities/trust-feature";
import { TrustIcon } from "@/presentation/components/icons/TrustIcon";
import { HeroBannerVideo } from "@/presentation/components/home/HeroBannerVideo";

export function HeroSection({
  hero,
  products,
  trustFeatures,
}: {
  hero: HeroContent;
  products: Product[];
  trustFeatures: TrustFeature[];
}) {
  const slides =
    products.length > 0
      ? products
      : [
          {
            id: "fallback",
            name: hero.headline,
            summary: hero.subheadline,
            imageSrc: hero.imageSrc,
            href: hero.ctaHref,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
      setTextKey((key) => key + 1);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const active = slides[activeIndex] ?? slides[0];

  return (
    <section className="hero">
      <div className="hero__media">
        {hero.videoSrc ? (
          <HeroBannerVideo
            src={hero.videoSrc}
            poster={hero.imageSrc}
            title={hero.imageAlt}
          />
        ) : null}
        <div className="hero__overlay" />
        <div className="hero__media-glow" aria-hidden="true" />
      </div>

      <div className="hero__content" key={textKey}>
        <p className="hero__eyebrow">Featured capability</p>
        <h1 className="hero__headline">{active.name}</h1>
        <p className="hero__subheadline">{active.summary}</p>
        <Link href={active.href} className="btn btn--primary btn--lg">
          View details
        </Link>

        <div className="hero__dots" role="tablist" aria-label="Hero slides">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${slide.name}`}
              className={`hero__dot${index === activeIndex ? " is-active" : ""}`}
              onClick={() => {
                setActiveIndex(index);
                setTextKey((key) => key + 1);
              }}
            />
          ))}
        </div>
      </div>

      <div className="trust-bar">
        {trustFeatures.map((feature) => (
          <article key={feature.id} className="trust-bar__item">
            <TrustIcon name={feature.icon} className="trust-bar__icon" />
            <div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
