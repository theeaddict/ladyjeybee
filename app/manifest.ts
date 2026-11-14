import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    description: "Compassionate home-care services in Diani, Kwale County, Kenya.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7ef",
    theme_color: "#0b3a40",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
