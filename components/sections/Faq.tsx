import { faqs } from "@/content/seo";
import { faqSchema } from "@/lib/schema";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Frequently asked questions, with FAQPage structured data for search and AI answer engines. */
export function Faq() {
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="container faq__inner">
        <SectionHeading
          title={<span id="faq-title">Frequently Asked Questions</span>}
          intro="Answers to the questions families ask most about home care in Diani and Kwale County."
        />
        <Reveal className="faq__list">
          {faqs.map((f) => (
            <details key={f.question} className="faq__item">
              <summary>
                <h3>{f.question}</h3>
                <Icon name="chevronDown" size={22} className="faq__chevron" />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}
