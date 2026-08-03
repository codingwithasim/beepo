import type {
  MetadataRoute,
} from "next";

import {
  absoluteUrl,
  indexablePageKeys,
  seoPages,
} from "@/lib/seo";

export default function sitemap():
  MetadataRoute.Sitemap {
  return indexablePageKeys.map(
    (pageKey) => {
      const page =
        seoPages[pageKey];

      return {
        url: absoluteUrl(page.path),
        changeFrequency:
          page.changeFrequency,
        priority: page.priority,
      };
    }
  );
}