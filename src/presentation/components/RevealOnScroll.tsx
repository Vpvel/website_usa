"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight scroll-reveal:
 * - Elements should include `data-reveal` and `reveal` class
 * - When they enter the viewport, we add `reveal--visible`
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (nodes.length === 0) return;

    if (!("IntersectionObserver" in window)) {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((el) => {
      el.classList.remove("reveal--visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
