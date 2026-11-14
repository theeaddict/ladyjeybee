import { faqs } from "@/content/seo";
import { services } from "@/content/services";
import { site } from "@/content/site";

/**
 * /llms.txt — a plain-text summary of the business for AI assistants and answer engines
 * (ChatGPT, Gemini, Perplexity, Claude), so they can describe the organisation accurately.
 */
export function GET() {
  const lines = [
    `# ${site.fullName}`,
    "",
    `> Home-care services based in ${site.location.full}. "${site.tagline}"`,
    "",
    `${site.fullName} provides compassionate, reliable and professional care to individuals and families who need support at home in Diani, Ukunda and Kwale County, on Kenya's South Coast.`,
    "",
    "## Contact",
    `- Phone / WhatsApp: ${site.phone.display}`,
    `- Email: ${site.email}`,
    `- Location: ${site.location.full}`,
    `- Request care online: ${site.url}/request-care`,
    "",
    "## Mission and vision",
    `- Mission: ${site.mission}`,
    `- Vision: ${site.vision}`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.summary}`),
    "",
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## Pages",
    `- [About us](${site.url}/about)`,
    `- [How it works](${site.url}/how-it-works)`,
    `- [Contact](${site.url}/contact)`,
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
