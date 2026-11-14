import type { Metadata } from "next";
import { mailHref, site, telHref } from "@/content/site";
import { ResetConsent } from "@/components/analytics/ResetConsent";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.fullName} handles your information, cookies and the Meta Pixel.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title={
          <>
            Privacy <em>Policy</em>
          </>
        }
        text="How we handle the information you share with us."
        path="/privacy"
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container prose privacy">
          <p className="hint">Last updated: November 2026</p>

          <h2>Who we are</h2>
          <p>
            {site.fullName} provides home-care services from {site.location.full}. You can contact us by phone on{" "}
            <a href={telHref}>{site.phone.display}</a> or by email at <a href={mailHref}>{site.email}</a>.
          </p>

          <h2>Information you share with us</h2>
          <p>
            The Request Care and contact forms on this website do not store your details. When you complete a form,
            your message is prepared so that you can send it to us yourself on WhatsApp or by email. We only receive
            what you choose to send.
          </p>
          <p>
            We use the information you send — such as your name, phone number and the care you are looking for — only
            to respond to you and to discuss and arrange care. Please do not send medical records through the website,
            WhatsApp or email; we will discuss anything sensitive with you directly.
          </p>

          <h2>Cookies and the Meta Pixel</h2>
          <p>
            With your permission, this website uses the Meta Pixel, a tool provided by Meta Platforms (Facebook and
            Instagram). It sets cookies that help us understand how visitors find our website and measure our
            adverts. It records page visits and when someone taps to call, message or email us, or completes a form.
          </p>
          <p>
            The Meta Pixel does not receive anything you type into our forms, and we do not send it any health
            information. It only loads if you select &ldquo;Accept&rdquo; on the cookie notice. If you select
            &ldquo;Decline&rdquo;, no Meta cookies are set. You can change your choice at any time:
          </p>
          <p>
            <ResetConsent />
          </p>

          <h2>Your rights</h2>
          <p>
            Under Kenya&apos;s Data Protection Act, 2019, you may ask to see, correct or delete the personal
            information we hold about you. To make a request, email us at <a href={mailHref}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
