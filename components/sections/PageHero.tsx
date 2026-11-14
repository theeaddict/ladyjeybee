import Link from "next/link";
import type { ReactNode } from "react";
import { hasPhoto, type ImageKey } from "@/content/images";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  image?: ImageKey;
  crumbs?: { label: string; href?: string }[];
  /** URL path of this page, used for breadcrumb structured data. */
  path: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, text, image, crumbs = [], path, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      {image && hasPhoto(image) && (
        <div className="page-hero__media">
          <Photo slot={image} sizes="(max-width: 760px) 100vw, 50vw" priority parallax={0.06} />
        </div>
      )}
      <div className="container">
        <div className="page-hero__inner">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow eyebrow--light">{eyebrow}</p>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
          {children}
        </div>
      </div>
      <svg className="hero__curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 120V70C260 120 520 120 760 92 1000 64 1220 14 1440 0v120Z" fill="var(--ivory)" />
        <path d="M0 70C260 120 520 120 760 92 1000 64 1220 14 1440 0" fill="none" stroke="var(--gold)" strokeWidth="3" />
      </svg>
      <JsonLd data={breadcrumbSchema(crumbs, path)} />
    </section>
  );
}
