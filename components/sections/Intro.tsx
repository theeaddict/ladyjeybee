import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { QuotePanel } from "@/components/ui/QuotePanel";
import { Reveal } from "@/components/ui/Reveal";
import { hasPhoto } from "@/content/images";
import { site } from "@/content/site";

export function Intro() {
  return (
    <section className="section intro" aria-labelledby="intro-title">
      <div className="container intro__grid">
        <Reveal variant="mask" className="intro__media">
          {hasPhoto("intro") ? (
            <>
              <div className="intro__frame">
                <Photo slot="intro" sizes="(max-width: 900px) 100vw, 50vw" parallax={0.05} />
              </div>
              <div className="intro__badge">
                <span className="intro__badge-quote">&ldquo;</span>
                <p>{site.tagline}</p>
              </div>
            </>
          ) : (
            <QuotePanel />
          )}
        </Reveal>
        <Reveal className="intro__copy" delay={120}>
          <p className="eyebrow">Who We Are</p>
          <h2 id="intro-title" className="display">
            Care That Comes <em>From the Heart</em>
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p>
            {site.fullName} was established with a passion for providing compassionate, reliable and professional
            care to individuals and families who need support at home.
          </p>
          <p>
            We are committed to improving the quality of life of our clients through personalised care, dignity,
            comfort and respect.
          </p>
          <Button href="/about" variant="teal">
            Discover Our Organisation
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
