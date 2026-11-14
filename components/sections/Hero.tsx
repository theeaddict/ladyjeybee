import { telHref } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Photo slot="hero" sizes="(max-width: 900px) 100vw, 62vw" priority parallax={0.08} />
      </div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--light hero__eyebrow">Professional Home Care in Diani, Kwale County</p>
          <h1 id="hero-title" className="hero__title">
            <span className="line"><span>Compassionate Care,</span></span>
            <span className="line"><em>Right at Your</em></span>
            <span className="line"><em>Doorstep.</em></span>
          </h1>
          <p className="hero__lead">
            Reliable, personalised and professional home-care services for your loved ones — with dignity, comfort
            and respect.
          </p>
          <div className="hero__actions">
            <Button href="/request-care" icon="calendar">
              Request Care
            </Button>
            <Button href={telHref} variant="outline-light" icon="phone">
              Talk to Our Team
            </Button>
          </div>
          <p className="hero__area">Based in Diani, Kwale County, Kenya</p>
        </div>
      </div>
      <svg className="hero__curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 120V70C260 120 520 120 760 92 1000 64 1220 14 1440 0v120Z" fill="var(--ivory)" />
        <path d="M0 70C260 120 520 120 760 92 1000 64 1220 14 1440 0" fill="none" stroke="var(--gold)" strokeWidth="3" />
      </svg>
    </section>
  );
}
