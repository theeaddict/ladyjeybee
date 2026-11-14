"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mailHref, nav, site, telHref } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { MobileDrawer } from "./MobileDrawer";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  const links = nav.filter((item) => item.href !== "/request-care");

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="topbar">
          <div className="container container--wide topbar__inner">
            <span className="topbar__item">
              <Icon name="pin" size={15} /> {site.location.full}
            </span>
            <span className="topbar__group">
              <a className="topbar__item" href={telHref}>
                <Icon name="phone" size={15} /> {site.phone.display}
              </a>
              <a className="topbar__item" href={mailHref}>
                <Icon name="mail" size={15} /> {site.email}
              </a>
              <a className="topbar__item topbar__wa" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={15} /> Chat on WhatsApp
              </a>
            </span>
          </div>
        </div>

        <div className="mainbar">
          <div className="container container--wide mainbar__inner">
            <Logo />
            <nav aria-label="Main" className="mainnav">
              <ul>
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`mainnav__link ${isActive(pathname, item.href) ? "is-active" : ""}`}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link href="/request-care" className="btn btn--gold mainbar__cta">
              <Icon name="calendar" size={18} />
              <span>Request Care</span>
            </Link>
            <div className="mainbar__mobile">
              <a href={telHref} className="icon-btn" aria-label={`Call ${site.phone.display}`}>
                <Icon name="phone" size={20} />
              </a>
              <button
                ref={menuButton}
                type="button"
                className="icon-btn icon-btn--menu"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen(true)}
              >
                <Icon name="menu" size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileDrawer open={open} onClose={closeMenu} />
    </>
  );
}
