# Lady Jeybee Aurelia — Health & Home Care Services

Website for a home-care service in Diani, Kwale County, Kenya.
Built with Next.js (App Router), TypeScript and [Lenis](https://lenis.darkroom.engineering/) smooth scrolling.

## Run locally

```bash
npm install
npm run dev
```

Production build: `npm run build && npm start`.
Set `NEXT_PUBLIC_SITE_URL` to the live domain so canonical URLs, the sitemap and Open Graph tags are correct.

## Hosting (VPS + Docker)

The site runs as a Docker container on the VPS behind Caddy. See `deploy/`:

| File | Purpose |
| --- | --- |
| `Dockerfile`, `docker-compose.yml` | Builds and runs the site on `127.0.0.1:3100` |
| `deploy/deploy.sh` | Syncs code to the VPS, builds the image and restarts the container |
| `deploy/ladyjeybee.caddy` | Caddy site entry for `ladyjeybee.biasharaos.com` |
| `deploy/install-caddy.sh` | Installs that entry on the VPS (needs `sudo`), validating the whole Caddy config before reloading |

**Redeploy after a change:** `./deploy/deploy.sh`

**Moving to the client's own domain**
1. Point the client's domain at the VPS (A record to `13.140.182.206`, DNS-only, so Caddy can issue a Let's Encrypt certificate).
2. Add a Caddy block for the new domain (copy `deploy/ladyjeybee.caddy`, remove the `X-Robots-Tag` line and `import origin_tls`) and reload Caddy.
3. Redeploy with the new address and indexing switched on: `SITE_URL=https://clientdomain.co.ke NOINDEX= ./deploy/deploy.sh`
4. Optionally redirect `ladyjeybee.biasharaos.com` to the new domain, then submit the new `/sitemap.xml` in Google Search Console.

While `NEXT_PUBLIC_NOINDEX=true` (the temporary subdomain) the site tells search engines not to index it.

## Settings for going live

Copy `.env.example` to `.env.local` (or add the same variables in your hosting dashboard):

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_NOINDEX` | `true` on temporary domains so search engines skip the site. Leave unset on the real domain |
| `NEXT_PUBLIC_SITE_URL` | Live domain — used for canonical URLs, the sitemap, structured data and link previews |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID from Meta Events Manager. Empty = pixel off |
| `NEXT_PUBLIC_META_DOMAIN_VERIFICATION` | Meta Business domain verification code |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |

## Meta Pixel

- Loads **only after the visitor accepts** the cookie notice (Kenya Data Protection Act, 2019). Declining sets no Meta cookies.
- Events: `PageView` (every page), `Contact` (taps on Call, WhatsApp or Email links), `Lead` (Request Care or contact form completed).
- No form contents, names, phone numbers or health information are ever sent to Meta (also required by Meta's rules for health-related sites).
- Visitors can change their choice on the Privacy page (`/privacy`).

## SEO and AEO (search + AI answer engines)

- Search phrases are in `content/seo.ts` (`keywords`) and appear naturally in page titles, descriptions and copy.
- Each page has its own title and description; service pages include the location ("… in Diani, Kwale County").
- Structured data (schema.org): `LocalBusiness` + `WebSite` on every page, `FAQPage` on the homepage,
  `Service` on each service page and `BreadcrumbList` on inner pages (`lib/schema.ts`).
- The homepage FAQ (`content/seo.ts`, `faqs`) answers common questions in plain language — the format Google and AI assistants quote.
- `/llms.txt` gives AI assistants (ChatGPT, Gemini, Perplexity, Claude) a plain-text summary of the business.
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, the favicon and a 1200×630 link-preview image are generated automatically.

After launch: add the site to Google Search Console, submit `/sitemap.xml`, and create a Google Business Profile
for the Diani location — the profile matters most for local "near me" searches.

## Where to edit things

| What | File |
| --- | --- |
| Business name, phone, email, WhatsApp, location, mission, vision | `content/site.ts` |
| Search keywords and FAQ answers | `content/seo.ts` |
| The 10 services (titles, descriptions, detail page text) | `content/services.ts` |
| Photos and their alt text | `content/images.ts` + `public/images/` |
| Request Care form options | `lib/careRequest.ts` |
| Colours, fonts, spacing | `app/globals.css` (`:root` tokens) |

## Photos

Real photos supplied by the client:

| File | Source | Used for |
| --- | --- | --- |
| `caregiver-client.jpg` | IMG-20261113-WA0003 | Home hero, About care section, Contact header, Elderly Care |
| `business-portrait.jpg` | IMG-20261113-WA0004, full photo — the face of the business | Home intro, About story, How It Works header, Home Nursing Support |
| `bedside-care.jpg` | IMG-20261113-WA0005 | Our Services header, Chronic Illness Care |

The bedside photo shows a patient (face not visible) — confirm the patient agreed to the photo being published.

### AI-generated stand-ins

Files named `generated-*.jpg` are **AI-generated images**, used for now where no real photo exists:
Palliative, Post-Operative, Childcare, Wound Dressing, Hygiene, Medication, Mobility, and the closing
call-to-action background. They do not show the client's staff or clients — replace them with real photos
when available, keeping the slot names in `content/images.ts`.

To add or replace a photo, put the file in `public/images/` and set `src` for the matching slot in `content/images.ts`.
Slots with `src: null` show a designed panel instead (service icon, quote panel or plain teal background).

The logo in `components/ui/Logo.tsx` is a redrawn version of the heart-and-figures mark from the posters.
The two posters show different logos, so replace it with the client's official logo file when available.

Shot list: caregiver with an elderly client at home (hero), caregiver and client talking (intro), a nurse giving
home support, a caregiver helping a recovering patient, help with grooming, caring for a child, a wound-dressing
close-up, a medication reminder, and walking/mobility support. Natural light, warm and realistic — no hospital scenes.

## Forms

There is no backend. The Request Care and Contact forms validate input, show a summary, and then hand the
enquiry to WhatsApp (`wa.me/254705865570`) or email with the details pre-filled. To store enquiries on a server
later, replace the submit handler in `components/forms/CareRequestWizard.tsx`.
