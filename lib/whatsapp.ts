import { site } from "@/content/site";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Lady Jeybee Aurelia, I would like to enquire about home-care services.";

/** Builds a wa.me link using the international number (no "+" or spaces). */
export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
