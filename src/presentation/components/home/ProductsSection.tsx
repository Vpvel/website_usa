"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/domain/entities/product";

export function ProductsSection({ products }: { products: Product[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
      setTextKey((key) => key + 1);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [products.length]);

  const active = products[activeIndex];
  if (!active) return null;

  return (
    <section className="products-banner" aria-label="Products and capabilities">
      <div className="products-banner__intro">
        <h2>Products & capabilities</h2>
        <p>
          Native and modified starches, custom formulation, and US supply built
          for industrial food manufacturers.
        </p>
      </div>

      <div className="products-banner__stage">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`products-banner__slide${index === activeIndex ? " is-active" : ""}`}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              priority={index === 0}
              sizes="100vw"
              className="products-banner__image"
            />
          </div>
        ))}

        <div className="products-banner__overlay" />

        <div className="products-banner__foreground" key={textKey}>
          <p className="products-banner__eyebrow">Featured capability</p>
          <h3 className="products-banner__title">{active.name}</h3>
          <p className="products-banner__summary">{active.summary}</p>
          <Link href={active.href} className="btn btn--primary btn--lg">
            View details
          </Link>
        </div>

        <div className="products-banner__dots" role="tablist" aria-label="Slides">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${product.name}`}
              className={`products-banner__dot${index === activeIndex ? " is-active" : ""}`}
              onClick={() => {
                setActiveIndex(index);
                setTextKey((key) => key + 1);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
