"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { META_PIXEL_ID, loadMetaPixel, readConsent, saveConsent, trackEvent, type Consent } from "@/lib/analytics";

/**
 * Meta Pixel with a consent notice. Does nothing unless NEXT_PUBLIC_META_PIXEL_ID is set.
 * Tracks page views and clicks on Call / WhatsApp / Email links ("Contact").
 */
export function MetaPixel() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null | "unknown">("unknown");

  // Read the stored choice after mount (localStorage is not available during prerender).
  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const stored = readConsent();
    if (stored === "granted") loadMetaPixel();
    queueMicrotask(() => setConsent(stored));
  }, []);

  // Page views, including client-side navigation between pages.
  useEffect(() => {
    if (consent === "granted") trackEvent("PageView");
  }, [pathname, consent]);

  // Contact clicks anywhere on the site.
  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      const href = link?.getAttribute("href") ?? "";
      if (/^(tel:|mailto:|https:\/\/wa\.me\/)/.test(href)) trackEvent("Contact");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (!META_PIXEL_ID || consent !== null) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    if (value === "granted") loadMetaPixel();
    setConsent(value);
  };

  return (
    <div className="consent" role="region" aria-label="Cookie consent">
      <p>
        We use Meta Pixel cookies to understand how families find us and to improve our adverts. Form details and
        health information are never shared. <Link href="/privacy">Privacy policy</Link>
      </p>
      <div className="consent__actions">
        <button type="button" className="btn btn--outline" onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className="btn btn--teal" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
