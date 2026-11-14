import type { Metadata } from "next";
import { services } from "@/content/services";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Home Care Services in Diani & Kwale County",
  description:
    "Explore our home-care services in Diani and Kwale County: elderly care, home-based nursing support, palliative care, post-operative care, childcare and more.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Home Care Shaped Around <em>Each Client</em>
          </>
        }
        text="From everyday personal care to support during recovery, our services are arranged around each client's needs, with dignity, comfort and respect."
        image="servicesHeader"
        path="/services"
        crumbs={[{ label: "Our Services" }]}
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Our Home Care Services"
            intro="Select a service to learn what it involves, who may benefit and how to enquire."
          />
          <ul className="services-grid">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 80} className="carousel__item">
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta
        title="Not Sure Which Service You Need?"
        text="Tell us about your loved one's situation and we will talk through the support that may suit them best."
      />
    </>
  );
}
