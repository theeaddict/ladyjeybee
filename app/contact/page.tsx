import type { Metadata } from "next";
import { mailHref, site, telHref } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact Us — Home Care in Diani & Ukunda",
  description:
    "Contact Lady Jeybee Aurelia Health & Home Care Services in Diani, Ukunda, Kwale County. Call +254 705 865 570, WhatsApp or email lakumu022@gmail.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            We&apos;re Here <em>to Help</em>
          </>
        }
        text="Call, message or email us to talk about the care your loved one needs."
        image="contact"
        path="/contact"
        crumbs={[{ label: "Contact Us" }]}
      />

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container split split--top">
          <Reveal className="panel panel--teal">
            <h2 style={{ fontSize: "1.8rem", marginBottom: 6 }}>{site.fullName}</h2>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold-light)" }}>
              {site.tagline}
            </p>
            <div className="contact-list">
              <a href={telHref}>
                <span className="contact-list__icon">
                  <Icon name="phone" />
                </span>
                <span>
                  <span className="contact-list__label">Call us</span>
                  <span className="contact-list__value">{site.phone.display}</span>
                </span>
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <span className="contact-list__icon">
                  <Icon name="whatsapp" />
                </span>
                <span>
                  <span className="contact-list__label">WhatsApp</span>
                  <span className="contact-list__value">Chat with our team</span>
                </span>
              </a>
              <a href={mailHref}>
                <span className="contact-list__icon">
                  <Icon name="mail" />
                </span>
                <span>
                  <span className="contact-list__label">Email</span>
                  <span className="contact-list__value">{site.email}</span>
                </span>
              </a>
              <div>
                <span className="contact-list__icon">
                  <Icon name="pin" />
                </span>
                <span>
                  <span className="contact-list__label">Location</span>
                  <span className="contact-list__value">{site.location.full}</span>
                </span>
              </div>
            </div>
            <p style={{ marginTop: 22, marginBottom: 0, fontSize: "0.95rem" }}>
              Care is provided in clients&apos; homes. Get in touch to confirm availability in your area.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
