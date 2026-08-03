import type {
  MetadataRoute,
} from "next";

import {
  siteConfig,
} from "@/lib/seo";

export default function manifest():
  MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.title,
    short_name: siteConfig.name,
    description:
      siteConfig.description,

    start_url: "/",
    scope: "/",

    display: "standalone",
    orientation: "any",

    background_color: "#09090b",
    theme_color: "#09090b",

    lang: siteConfig.language,

    categories: [
      "productivity",
      "utilities",
    ],

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src:
          "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}