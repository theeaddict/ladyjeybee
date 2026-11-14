"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis smooth scrolling plus a light parallax driver.
 * Elements with `data-parallax="0.12"` drift by that fraction of their
 * distance from the viewport centre. Everything is skipped when the user
 * prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const frame = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -96 },
      touchMultiplier: 1.2,
    });

    const parallax = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const rect = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        const speed = Number(el.dataset.parallax) || 0.1;
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.setProperty("--parallax", `${offset.toFixed(1)}px`);
      });
    };

    const raf = (time: number) => {
      instance.raf(time);
      frame.current = requestAnimationFrame(raf);
    };
    instance.on("scroll", parallax);
    parallax();
    frame.current = requestAnimationFrame(raf);
    document.documentElement.classList.add("lenis-on");
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame.current);
      instance.destroy();
      document.documentElement.classList.remove("lenis-on");
      setLenis(null);
    };
  }, []);

  // Start each new page at the top.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
