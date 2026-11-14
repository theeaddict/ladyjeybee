import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasPhoto } from "@/content/images";
import { serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { getService, services } from "@/content/services";
import { site, telHref } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// All service pages are generated at build time, so reading the slug never blocks a visitor.
export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.shortTitle} in Diani, Kwale County`,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} | ${site.name}`, description: service.seoDescription },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related.map(getService).filter((s) => s !== undefined);
  const enquiry = `Hello ${site.name}, I would like to enquire about ${service.title}.`;

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={service.title}
        text={service.summary}
        image={service.image}
        path={`/services/${service.slug}`}
        crumbs={[{ label: "Our Services", href: "/services" }, { label: service.shortTitle }]}
      >
        <div className="hero__actions" style={{ marginTop: 28 }}>
          <Button href={`/request-care?service=${service.slug}`} icon="calendar">
            Request This Service
          </Button>
          <Button href={whatsappUrl(enquiry)} variant="outline-light" icon="whatsapp">
            Ask on WhatsApp
          </Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <div className="prose">
            <Reveal>
              <p className="eyebrow">About this service</p>
              <h2>
                {service.shortTitle} <em className="display-em">at home</em>
              </h2>
              <p>{service.intro}</p>
            </Reveal>

            <Reveal>
              <h3>What the service involves</h3>
              <ul className="checklist">
                {service.involves.map((item) => (
                  <li key={item}>
                    <span className="checklist__icon">
                      <Icon name="check" size={16} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h3>Who may benefit</h3>
              <ul className="checklist">
                {service.whoBenefits.map((item) => (
                  <li key={item}>
                    <span className="checklist__icon">
                      <Icon name="heart" size={15} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="hint" style={{ marginTop: 24 }}>
                Every client is different. The exact support we provide is discussed and agreed with you before
                care begins, according to the client&apos;s needs and our availability.
              </p>
            </Reveal>
          </div>

          <aside className="detail-aside">
            {hasPhoto(service.image) && (
              <Reveal variant="mask">
                <div className="split__media split__media--wide">
                  <Photo slot={service.image} sizes="(max-width: 1024px) 100vw, 40vw" parallax={0.05} />
                </div>
              </Reveal>
            )}
            <div className="panel panel--teal">
              <h2 style={{ fontSize: "1.5rem", marginBottom: 10 }}>How to enquire</h2>
              <p>Tell us a little about who needs care. We will get back to you to discuss the support required.</p>
              <div className="contact-list">
                <Link href={`/request-care?service=${service.slug}`}>
                  <span className="contact-list__icon">
                    <Icon name="calendar" />
                  </span>
                  <span>
                    <span className="contact-list__label">Online</span>
                    <span className="contact-list__value">Fill in the care request form</span>
                  </span>
                </Link>
                <a href={telHref}>
                  <span className="contact-list__icon">
                    <Icon name="phone" />
                  </span>
                  <span>
                    <span className="contact-list__label">Call</span>
                    <span className="contact-list__value">{site.phone.display}</span>
                  </span>
                </a>
                <a href={whatsappUrl(enquiry)} target="_blank" rel="noopener noreferrer">
                  <span className="contact-list__icon">
                    <Icon name="whatsapp" />
                  </span>
                  <span>
                    <span className="contact-list__label">WhatsApp</span>
                    <span className="contact-list__value">Send us a message</span>
                  </span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section services-band">
        <div className="container">
          <SectionHeading title="Related Services" />
          <ul className="services-grid">
            {related.map((s) => (
              <Reveal as="li" key={s.slug} className="carousel__item">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </ul>
          <div className="center">
            <Button href="/services" variant="teal">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      <FinalCta title={`Arrange ${service.shortTitle} for Your Loved One`} />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
