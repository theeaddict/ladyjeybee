import type { Faq } from "@/content/seo";
import type { Service } from "@/content/services";
import { services } from "@/content/services";
import { site } from "@/content/site";

/** Structured data (schema.org JSON-LD) for search engines and AI answer engines. */

const businessId = `${site.url}/#business`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: site.fullName,
    alternateName: site.name,
    slogan: site.tagline,
    description:
      "Compassionate, reliable and professional home-care services for individuals and families in Diani and Kwale County, Kenya.",
    telephone: site.phone.tel,
    email: site.email,
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Diani",
      addressRegion: site.location.county,
      addressCountry: "KE",
    },
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home care services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.fullName,
    url: site.url,
    inLanguage: "en-KE",
    publisher: { "@id": businessId },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.intro,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": businessId },
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: { label: string; href?: string }[], currentPath: string) {
  const items = [{ label: "Home", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href ?? currentPath}`,
    })),
  };
}
