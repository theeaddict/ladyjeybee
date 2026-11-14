"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { mailHref, nav, site, telHref } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { useLenis } from "./SmoothScroll";
import { isActive } from "./Header";

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.classList.add("drawer-open");
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("drawer-open");
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  return (
    <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
      <div className="drawer__backdrop" onClick={onClose} />
      <div
        ref={panel}
        id="mobile-drawer"
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-lenis-prevent
      >
        <div className="drawer__head">
          <span className="drawer__brand">
            <LogoMark size={40} />
            <span>{site.name}</span>
          </span>
          <button ref={closeBtn} type="button" className="icon-btn icon-btn--light" aria-label="Close menu" onClick={onClose}>
            <Icon name="close" size={22} />
          </button>
        </div>

        <nav aria-label="Mobile" className="drawer__nav">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={isActive(pathname, item.href) ? "is-active" : ""}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  <span className="drawer__num">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer__foot">
          <p className="drawer__tag">{site.tagline}</p>
          <Link href="/request-care" className="btn btn--gold btn--block" onClick={onClose}>
            <Icon name="calendar" size={18} />
            <span>Request Care</span>
          </Link>
          <div className="drawer__actions">
            <a href={telHref} className="btn btn--outline-light">
              <Icon name="phone" size={18} />
              <span>Call</span>
            </a>
            <a href={whatsappUrl()} className="btn btn--outline-light" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              <span>WhatsApp</span>
            </a>
          </div>
          <a href={mailHref} className="drawer__email">
            <Icon name="mail" size={16} /> {site.email}
          </a>
          <p className="drawer__loc">
            <Icon name="pin" size={16} /> {site.location.full}
          </p>
        </div>
      </div>
    </div>
  );
}
