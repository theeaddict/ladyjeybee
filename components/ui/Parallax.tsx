"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Oversized layer that SmoothScroll moves on scroll. The data attribute is set
 * after mount so the scroll driver never touches markup React is hydrating.
 */
export function Parallax({ speed, children }: { speed: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.parallax = String(speed);
    return () => {
      delete el.dataset.parallax;
    };
  }, [speed]);
  return (
    <div ref={ref} className="parallax">
      {children}
    </div>
  );
}
