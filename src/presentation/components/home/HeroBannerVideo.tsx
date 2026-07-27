"use client";

import { useEffect, useRef } from "react";

export function HeroBannerVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can be blocked; poster image still shows.
      }
    };

    void tryPlay();

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        void tryPlay();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="hero__video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-label={title}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
