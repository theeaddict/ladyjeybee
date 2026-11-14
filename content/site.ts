/**
 * Central business information. Update details here and they change everywhere.
 */
export const site = {
  name: "Lady Jeybee Aurelia",
  fullName: "Lady Jeybee Aurelia Health & Home Care Services",
  descriptor: "Health & Home Care Services",
  tagline: "Care is not just a job but a calling.",
  /** Set NEXT_PUBLIC_SITE_URL to the real domain when the site is deployed. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: {
    area: "Diani, Ukunda",
    county: "Kwale County",
    country: "Kenya",
    full: "Diani, Ukunda, Kwale County, Kenya",
  },
  phone: {
    display: "+254 705 865 570",
    tel: "+254705865570",
  },
  /** International format without "+" for wa.me links. */
  whatsapp: "254705865570",
  email: "lakumu022@gmail.com",
  areasServed: ["Diani", "Ukunda", "Kwale County"],
  vision:
    "To become a trusted name in home-based care by bringing quality, compassionate care right to people's homes.",
  mission:
    "To provide compassionate, reliable and professional care that improves the quality of life of our clients.",
  promise:
    "To treat every client with dignity, respect, comfort and genuine care.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Request Care", href: "/request-care" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const telHref = `tel:${site.phone.tel}`;
export const mailHref = `mailto:${site.email}`;
