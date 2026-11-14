import Link from "next/link";
import { site } from "@/content/site";

/** Heart-and-family mark based on the client's poster logo. */
export function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
      <path
        d="M32 56C18 46 6 36 6 22.5 6 14.5 12.2 8 20 8c5 0 9.2 2.7 12 6.8C34.8 10.7 39 8 44 8c7.8 0 14 6.5 14 14.5C58 36 46 46 32 56Z"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path d="M10 44c6 8 16 13 22 13s14-3 20-10" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" />
      <g fill="currentColor">
        <circle cx="25" cy="22" r="4" />
        <path d="M19.5 41V31.5c0-3 2.4-5.5 5.5-5.5s5.5 2.5 5.5 5.5V41h-3.2v-7h-4.6v7Z" />
        <circle cx="39.5" cy="26" r="3.2" />
        <path d="M35.2 41v-7.2c0-2.4 1.9-4.3 4.3-4.3s4.3 1.9 4.3 4.3V41h-2.6v-5h-3.4v5Z" />
        <path d="M30 32.5h5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className={`logo logo--${tone}`} aria-label={`${site.fullName} — home`}>
      <LogoMark />
      <span className="logo__text">
        <span className="logo__name">{site.name}</span>
        <span className="logo__desc">{site.descriptor}</span>
        <span className="logo__tag">{site.tagline}</span>
      </span>
    </Link>
  );
}
