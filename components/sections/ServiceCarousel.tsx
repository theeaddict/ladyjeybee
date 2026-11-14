"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

export function ServiceCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const total = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
    setPages(total);
    const max = el.scrollWidth - el.clientWidth;
    setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (total - 1)));
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: pages > 1 ? (max * i) / (pages - 1) : 0, behavior: "smooth" });
  };

  return (
    <section className="section services-band" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          title={<span id="services-title">Our Home Care Services</span>}
          intro="Comprehensive care tailored to the unique needs of individuals and families."
        />
      </div>

      <div className="carousel container">
        <button
          type="button"
          className="carousel__arrow carousel__arrow--prev"
          onClick={() => scrollByPage(-1)}
          disabled={edges.start}
          aria-label="Previous services"
        >
          <Icon name="chevronLeft" size={22} />
        </button>
        <ul ref={track} className="carousel__track" onScroll={measure} aria-label="Services">
          {services.map((s, i) => (
            <li key={s.slug} className="carousel__item">
              <ServiceCard service={s} index={i} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="carousel__arrow carousel__arrow--next"
          onClick={() => scrollByPage(1)}
          disabled={edges.end}
          aria-label="Next services"
        >
          <Icon name="chevronRight" size={22} />
        </button>
      </div>

      {pages > 1 && (
        <div className="carousel__dots" role="group" aria-label="Choose a group of services">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={i === page ? "is-active" : ""}
              aria-label={`Show group ${i + 1} of ${pages}`}
              aria-current={i === page}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      <div className="center">
        <Button href="/services" variant="teal">
          Explore All Services
        </Button>
      </div>
    </section>
  );
}
