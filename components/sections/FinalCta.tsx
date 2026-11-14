import { images } from "@/content/images";
import { telHref } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

type FinalCtaProps = {
  title?: string;
  text?: string;
};

export function FinalCta({
  title = "Your Loved Ones Deserve Compassionate Care.",
  text = "Let us support your family with personalised home-care services built around dignity, comfort and respect.",
}: FinalCtaProps) {
  return (
    <section className={`final-cta ${images.cta.src ? "" : "final-cta--plain"}`} aria-labelledby="final-cta-title">
      {images.cta.src && (
        <div className="final-cta__media">
          <Photo slot="cta" sizes="100vw" parallax={0.1} />
        </div>
      )}
      <div className="container final-cta__inner">
        <Reveal className="final-cta__copy">
          <h2 id="final-cta-title" className="display display--light">
            {title}
          </h2>
          <p>{text}</p>
          <div className="final-cta__actions">
            <Button href="/request-care" icon="calendar">
              Request Care
            </Button>
            <Button href={telHref} variant="outline-light" icon="phone">
              Call Our Team
            </Button>
            <Button href={whatsappUrl()} variant="outline-light" icon="whatsapp">
              WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
