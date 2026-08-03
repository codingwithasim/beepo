import type {
  MetadataRoute,
} from "next";

import {
  absoluteUrl,
  isProductionDeployment,
  siteConfig,
} from "@/lib/seo";

export default function robots():
  MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",

      // Internal application endpoints
      // do not need to be crawled.
      disallow: ["/api/"],
    },

    sitemap: absoluteUrl(
      "/sitemap.xml"
    ),

    host: siteConfig.url.origin,
  };
}