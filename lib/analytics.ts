/**
 * Meta Pixel helpers. The pixel only loads after the visitor accepts cookies,
 * and events never include personal details or health information.
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const CONSENT_KEY = "lj-cookie-consent";
export type Consent = "granted" | "denied";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (private mode); the choice still applies for this page view.
  }
}

/** Standard Meta Pixel bootstrap, loaded only after consent. */
export function loadMetaPixel() {
  if (!META_PIXEL_ID || window.fbq) return;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
    else fbq.queue!.push(args);
  };
  fbq.queue = [];
  fbq.loaded = true;
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
}

/** Send a standard Meta event (e.g. "PageView", "Contact", "Lead") — never with personal data. */
export function trackEvent(name: "PageView" | "Contact" | "Lead") {
  window.fbq?.("track", name);
}
