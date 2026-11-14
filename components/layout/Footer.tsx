import { cacheLife } from "next/cache";
import Link from "next/link";
import { mailHref, nav, site, telHref } from "@/content/site";
import { services } from "@/content/services";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { CurrentYear } from "./CurrentYear";

/** Year when the page was generated; refreshed daily on the server, then confirmed in the browser. */
async function Year() {
  "use cache";
  cacheLife("days");
  return <CurrentYear fallback={new Date().getFullYear()} />;
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link href="/" className="footer__logo" aria-label={`${site.fullName} — home`}>
            <LogoMark size={56} />
            <span>
              <span className="footer__name">{site.name}</span>
              <span className="footer__desc">{site.descriptor}</span>
            </span>
          </Link>
          <p className="footer__tag">&ldquo;{site.tagline}&rdquo;</p>
          <p className="footer__blurb">
            Compassionate, reliable and professional home-care services, based in {site.location.full}.
          </p>
        </div>

        <div>
          <h2 className="footer__title">Explore</h2>
          <ul className="footer__list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Services</h2>
          <ul className="footer__list">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.shortTitle}</Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="footer__more">
                All services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Contact</h2>
          <ul className="footer__contact">
            <li>
              <Icon name="pin" size={18} />
              <span>{site.location.full}</span>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href={telHref}>{site.phone.display}</a>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={mailHref}>{site.email}</a>
            </li>
            <li>
              <Icon name="whatsapp" size={18} />
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>
          &copy; <Year /> {site.fullName}. All rights reserved.
        </p>
        <p>
          Home care in Diani, Ukunda and Kwale County, Kenya · <Link href="/privacy">Privacy policy</Link>
        </p>
      </div>
    </footer>
  );
}
