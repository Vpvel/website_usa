"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Phase = "boot" | "route" | "idle";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("boot");
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(12);
  const firstPath = useRef(pathname);
  const timers = useRef<number[]>([]);

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function runProgress(durationMs: number, onDone: () => void) {
    clearTimers();
    setProgress(18);
    timers.current.push(
      window.setTimeout(() => setProgress(55), durationMs * 0.28),
      window.setTimeout(() => setProgress(82), durationMs * 0.55),
      window.setTimeout(() => setProgress(100), durationMs * 0.82),
      window.setTimeout(onDone, durationMs),
    );
  }

  // First paint / boot loader
  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(false);
      setPhase("idle");
      document.documentElement.classList.add("page-ready");
      return;
    }

    document.documentElement.classList.remove("page-ready");
    runProgress(1100, () => {
      setVisible(false);
      setPhase("idle");
      document.documentElement.classList.add("page-ready");
      window.setTimeout(() => setProgress(0), 420);
    });

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Route changes
  useEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = pathname;

    if (prefersReducedMotion()) {
      document.documentElement.classList.add("page-ready");
      return;
    }

    document.documentElement.classList.remove("page-ready");
    setPhase("route");
    setVisible(true);
    setProgress(8);

    runProgress(680, () => {
      setVisible(false);
      setPhase("idle");
      document.documentElement.classList.add("page-ready");
      window.setTimeout(() => setProgress(0), 360);
    });

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Start early when internal links are clicked
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (prefersReducedMotion()) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) {
          return;
        }
      } catch {
        return;
      }

      document.documentElement.classList.remove("page-ready");
      setPhase("route");
      setVisible(true);
      setProgress(14);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!visible && phase === "idle") {
    return (
      <div
        className="page-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    );
  }

  const isBoot = phase === "boot";

  return (
    <>
      <div
        className="page-progress is-active"
        aria-hidden="true"
        style={{ transform: `scaleX(${Math.max(progress, 8) / 100})` }}
      />
      <div
        className={`page-loader${visible ? " is-visible" : " is-leaving"}${isBoot ? " is-boot" : " is-route"}`}
        role="status"
        aria-live="polite"
        aria-label="Loading page"
      >
        <div className="page-loader__veil" />
        <div className="page-loader__panel">
          <div className="page-loader__mark">
            <Image
              src="/images/logo/angel-starch-logo.webp"
              alt=""
              width={72}
              height={72}
              priority
              className="page-loader__logo"
            />
            <span className="page-loader__ring" aria-hidden="true" />
          </div>
          <p className="page-loader__brand">Angel Starch</p>
          <p className="page-loader__caption">
            {isBoot ? "Crafting clean-label experiences" : "Loading"}
          </p>
          <div className="page-loader__track" aria-hidden="true">
            <span style={{ width: `${Math.max(progress, 12)}%` }} />
          </div>
        </div>
      </div>
    </>
  );
}
