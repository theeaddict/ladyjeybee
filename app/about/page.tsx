import type { Metadata } from "next";
import { hasPhoto } from "@/content/images";
import { site } from "@/content/site";
import { QuotePanel } from "@/components/ui/QuotePanel";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { VisionMission } from "@/components/sections/VisionMission";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us — Home Care in Diani, Kwale County",
  description:
    "Lady Jeybee Aurelia Health & Home Care Services provides compassionate, reliable and professional home-based care for families in Diani, Ukunda and Kwale County.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Compassion", text: "Care given with kindness and understanding." },
  { title: "Dignity", text: "Every client is cared for in a way that protects their dignity." },
  { title: "Respect", text: "Every client and family is treated with respect." },
  { title: "Reliability", text: "Care that families can depend on." },
  { title: "Personalised Care", text: "Support shaped around each client's needs." },
  { title: "Comfort", text: "Care in the comfort of the client's own home." },
];

const approach = [
  "Learning about each client's requirements and circumstances",
  "Discussing and agreeing suitable care arrangements with the family",
  "Beginning care according to the agreed arrangements",
  "Caring for every client with dignity, comfort and respect",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Care Is Not Just a Job, <em>But a Calling</em>
          </>
        }
        text="A home-care service based in Diani, Ukunda, providing compassionate, reliable and professional care to individuals and families at home."
        path="/about"
        crumbs={[{ label: "About Us" }]}
      />

      <section className="section">
        <div className="container split">
          <Reveal variant="mask">
            <div className="split__media">
              <Photo slot="aboutStory" sizes="(max-width: 1024px) 100vw, 50vw" parallax={0.06} />
            </div>
          </Reveal>
          <Reveal className="prose">
            <p className="eyebrow">Our Story</p>
            <h2 className="display">
              Care That Comes <em>From the Heart</em>
            </h2>
            <span className="gold-rule" aria-hidden="true" />
            <p>
              {site.fullName} was established with a passion for providing compassionate, reliable and
              professional care to individuals and families who need support at home.
            </p>
            <p>
              We are committed to improving the quality of life of our clients through personalised care, dignity,
              comfort and respect.
            </p>
            <Button href="/services" variant="link">
              Explore our services
            </Button>
          </Reveal>
        </div>
      </section>

      <VisionMission />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Values"
            intro="The principles that guide the care we provide."
          />
          <ul className="values">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} className="value" delay={(i % 3) * 80}>
                <span className="value__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section services-band">
        <div className="container split">
          <Reveal className="prose">
            <p className="eyebrow">Our Care Philosophy</p>
            <h2 className="display">
              Supporting Families, <em>Not Just Clients</em>
            </h2>
            <span className="gold-rule" aria-hidden="true" />
            <p>
              When someone needs care, the whole family is affected. We work with families to understand what
              their loved one needs and to agree on the right support.
            </p>
            <ul className="checklist">
              {approach.map((a) => (
                <li key={a}>
                  <span className="checklist__icon">
                    <Icon name="check" size={16} />
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="mask">
            {hasPhoto("aboutCare") ? (
              <div className="split__media">
                <Photo slot="aboutCare" sizes="(max-width: 1024px) 100vw, 50vw" parallax={0.06} />
              </div>
            ) : (
              <QuotePanel text={site.promise} />
            )}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <blockquote className="quote-block">
              <p style={{ margin: 0 }}>{site.tagline}</p>
              <cite>{site.fullName}</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
