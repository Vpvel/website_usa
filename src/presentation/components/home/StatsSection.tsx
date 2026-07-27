"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/domain/entities/home-content";

function parseStatValue(value: string): {
  target: number;
  prefix: string;
  suffix: string;
} {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) {
    return { target: 0, prefix: "", suffix: value };
  }
  return {
    prefix: match[1] ?? "",
    target: Number(match[2]),
    suffix: match[3] ?? "",
  };
}

function useCountUp(target: number, enabled: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, enabled, durationMs]);

  return value;
}

function StatItem({
  value,
  label,
  active,
  delayMs,
}: {
  value: string;
  label: string;
  active: boolean;
  delayMs: number;
}) {
  const { target, prefix, suffix } = parseStatValue(value);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const count = useCountUp(target, shouldAnimate);

  useEffect(() => {
    if (!active) {
      return;
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setShouldAnimate(true);
      return;
    }
    const timer = window.setTimeout(() => setShouldAnimate(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [active, delayMs]);

  return (
    <article
      className={`stats__item${active ? " stats__item--visible" : ""}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <p className="stats__value">
        {prefix}
        {shouldAnimate ? count : 0}
        {suffix}
      </p>
      <p className="stats__label">{label}</p>
    </article>
  );
}

export function StatsSection({ stats }: { stats: HomeContent["stats"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats__inner">
        {stats.map((stat, index) => (
          <StatItem
            key={stat.id}
            value={stat.value}
            label={stat.label}
            active={active}
            delayMs={index * 120}
          />
        ))}
      </div>
    </section>
  );
}
