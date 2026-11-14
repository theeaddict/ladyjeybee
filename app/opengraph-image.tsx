import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.fullName} — home care in Diani, Kwale County`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview image used when the site is shared on WhatsApp, Facebook, etc. */
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/caregiver-client.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0b3a40" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 700, padding: "0 64px", color: "#fff" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#e4c57d", textTransform: "uppercase" }}>
            Home care · Diani, Kwale County
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#e4c57d", marginTop: 8 }}>{site.descriptor}</div>
          <div style={{ width: 90, height: 4, background: "#c9a24a", marginTop: 32 }} />
          <div style={{ fontSize: 30, fontStyle: "italic", marginTop: 28, color: "rgba(255,255,255,0.9)" }}>
            {`“${site.tagline}”`}
          </div>
          <div style={{ fontSize: 24, marginTop: 36, color: "rgba(255,255,255,0.75)" }}>{site.phone.display}</div>
        </div>
        <img src={src} alt="" width={500} height={630} style={{ objectFit: "cover", objectPosition: "50% 35%" }} />
      </div>
    ),
    size,
  );
}
