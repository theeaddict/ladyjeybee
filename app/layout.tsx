import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { keywords } from "@/content/seo";
import { site } from "@/content/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { JsonLd } from "@/components/ui/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Home Care Services in Diani, Kwale County | Lady Jeybee Aurelia",
    template: "%s | Lady Jeybee Aurelia",
  },
  description:
    "Compassionate, reliable and professional home-based care in Diani and Kwale County — elderly care, home nursing support, palliative care, post-operative care and more.",
  keywords,
  applicationName: site.fullName,
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  category: "Home care services",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: site.fullName,
    title: "Lady Jeybee Aurelia Health & Home Care Services",
    description: "Compassionate care, right at your doorstep. Home-care services in Diani and Kwale County.",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: site.noindex
    ? { index: false, follow: false }
    : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  // Search Console / Meta domain verification codes, set when the site goes live.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION
      ? { "facebook-domain-verification": process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B3A40",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </SmoothScroll>
        <MetaPixel />
        <JsonLd data={businessSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
