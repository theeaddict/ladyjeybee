import type { Metadata } from "next";
import Link from "next/link";
import { site, telHref } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "How It Works — Arranging Home Care",
  description:
    "Arranging home care in Diani and Kwale County is simple: contact us, discuss your needs, plan the support and begin care.",
  alternates: { canonical: "/how-it-works" },
};

const prepare = [
  "Who needs care, and their general situation",
  "The kind of support you are looking for",
  "Where care would take place",
  "When you would like support to begin",
  "The best way and time to reach you",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title={
          <>
            Arranging Care, <em>Step by Step</em>
          </>
        }
        text="We keep the process simple and personal, so your family can focus on what matters."
        image="howItWorks"
        path="/how-it-works"
        crumbs={[{ label: "How It Works" }]}
      />

      <Steps showHeading={false} />

      <section className="section services-band">
        <div className="container split split--top">
          <Reveal className="prose">
            <SectionHeading align="left" eyebrow="Before You Contact Us" title="What to Have Ready" />
            <p>
              You don&apos;t need anything formal to get started. It helps if you can tell us a little about the
              following — and if you&apos;re unsure about anything, we&apos;ll talk it through together.
            </p>
            <ul className="checklist">
              {prepare.map((p) => (
                <li key={p}>
                  <span className="checklist__icon">
                    <Icon name="check" size={16} />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="hint" style={{ marginTop: 22 }}>
              Please don&apos;t send medical records through the website or WhatsApp. We will discuss anything
              sensitive with you directly.
            </p>
          </Reveal>
          <Reveal className="panel panel--teal">
            <h2 style={{ fontSize: "1.7rem", marginBottom: 10 }}>Ready to talk?</h2>
            <p>Choose whichever way is easiest for you.</p>
            <div className="contact-list">
              <Link href="/request-care">
                <span className="contact-list__icon">
                  <Icon name="calendar" />
                </span>
                <span>
                  <span className="contact-list__label">Online form</span>
                  <span className="contact-list__value">Request care</span>
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
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <span className="contact-list__icon">
                  <Icon name="whatsapp" />
                </span>
                <span>
                  <span className="contact-list__label">WhatsApp</span>
                  <span className="contact-list__value">Chat with our team</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
