"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal with staggered professional entrances.
 * Use `data-reveal` (+ optional data-reveal="left|right|scale") and optional `data-reveal-delay`.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (nodes.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("reveal--visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("reveal--visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((el, index) => {
      el.classList.remove("reveal--visible");
      if (!el.dataset.revealDelay) {
        el.style.transitionDelay = `${Math.min(index * 40, 280)}ms`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
