import type { Metadata } from "next";

type SeoPath = "/" | `/${string}`;

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type SeoPageConfig = {
  path: SeoPath;
  displayName: string;

  /**
   * Tool titles exclude the Chrona suffix because the
   * root title template adds " | Chrona".
   *
   * The home title is already complete.
   */
  title: string;

  description: string;
  keywords: readonly string[];
  schemaName: string;
  features: readonly string[];
  changeFrequency: ChangeFrequency;
  priority: number;
};

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdObject
  | JsonLdValue[];

export type JsonLdObject = {
  [key: string]: JsonLdValue;
};

function createSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "http://localhost:3000";

  const url = new URL(configuredUrl);

  // Metadata must always use the site origin,
  // never an accidental path or query string.
  url.pathname = "/";
  url.search = "";
  url.hash = "";

  return url;
}

export const siteConfig = {
  name: "Chrona",

  title:
    "Chrona – Free Online Productivity Tools",

  description:
    "Chrona brings together timers, stopwatches, Pomodoro, world clocks, alarms, and more in one modern productivity toolkit.",

  applicationName: "Chrona",
  creator: "Chrona",
  publisher: "Chrona",
  category: "productivity",
  locale: "en_US",
  language: "en",
  url: createSiteUrl(),

  keywords: [
    "online productivity tools",
    "online timer",
    "online stopwatch",
    "Pomodoro timer",
    "world clock",
    "online alarm clock",
    "time management",
    "focus timer",
    "productivity toolkit",
  ],
} as const;

export const seoPages = {
  home: {
    path: "/",
    displayName: "Chrona",
    title:
      "Chrona – Free Online Productivity Tools",
    description:
      "Chrona brings together timers, stopwatches, Pomodoro, world clocks, alarms, and more in one modern productivity toolkit.",
    keywords: [
      "free productivity tools",
      "online time tools",
      "browser productivity tools",
    ],
    schemaName: "Chrona",
    features: [
      "Online countdown timer",
      "Online stopwatch",
      "Pomodoro focus timer",
      "World clock",
      "Browser alarm clock",
    ],
    changeFrequency: "weekly",
    priority: 1,
  },

  timer: {
    path: "/timer",
    displayName: "Timer",
    title:
      "Online Timer – Free Countdown Timer",
    description:
      "Create countdown timers instantly. Perfect for studying, cooking, workouts, productivity, and everyday tasks.",
    keywords: [
      "online timer",
      "countdown timer",
      "free timer",
      "study timer",
      "workout timer",
      "cooking timer",
    ],
    schemaName: "Chrona Online Timer",
    features: [
      "Custom countdown durations",
      "Browser-based timer",
      "Audio notification",
      "No installation required",
    ],
    changeFrequency: "monthly",
    priority: 0.9,
  },

  stopwatch: {
    path: "/stopwatch",
    displayName: "Stopwatch",
    title:
      "Online Stopwatch – Free Stopwatch",
    description:
      "Measure elapsed time with lap support using Chrona's free online stopwatch.",
    keywords: [
      "online stopwatch",
      "free stopwatch",
      "lap timer",
      "elapsed time",
      "browser stopwatch",
    ],
    schemaName: "Chrona Online Stopwatch",
    features: [
      "Elapsed-time measurement",
      "Lap support",
      "Browser-based stopwatch",
      "No installation required",
    ],
    changeFrequency: "monthly",
    priority: 0.9,
  },

  pomodoro: {
    path: "/pomodoro",
    displayName: "Pomodoro",
    title:
      "Pomodoro Timer – Focus Better",
    description:
      "Increase productivity with a free Pomodoro timer featuring focus sessions, short breaks, and long breaks.",
    keywords: [
      "Pomodoro timer",
      "focus timer",
      "productivity timer",
      "study timer",
      "work timer",
      "Pomodoro technique",
    ],
    schemaName: "Chrona Pomodoro Timer",
    features: [
      "Focus sessions",
      "Short breaks",
      "Long breaks",
      "Customizable productivity cycles",
    ],
    changeFrequency: "monthly",
    priority: 0.9,
  },

  worldClock: {
    path: "/world-clock",
    displayName: "World Clock",
    title:
      "World Clock – Current Time Around the World",
    description:
      "Track multiple cities simultaneously with Chrona's world clock.",
    keywords: [
      "world clock",
      "current time worldwide",
      "international time",
      "city time",
      "time zones",
      "multiple clocks",
    ],
    schemaName: "Chrona World Clock",
    features: [
      "Multiple city clocks",
      "Current local times",
      "International time tracking",
      "Time-zone-aware clocks",
    ],
    changeFrequency: "monthly",
    priority: 0.9,
  },

  alarms: {
    path: "/alarms",
    displayName: "Alarms",
    title:
      "Online Alarm Clock – Set Browser Alarms",
    description:
      "Create browser alarms with custom labels and multiple reminders.",
    keywords: [
      "online alarm clock",
      "browser alarm",
      "free alarm clock",
      "custom alarm",
      "multiple alarms",
    ],
    schemaName: "Chrona Online Alarm Clock",
    features: [
      "Multiple browser alarms",
      "Custom alarm labels",
      "Alarm reminders",
      "No installation required",
    ],
    changeFrequency: "monthly",
    priority: 0.9,
  },
} as const satisfies Record<
  string,
  SeoPageConfig
>;

export type SeoPageKey =
  keyof typeof seoPages;

export type ToolPageKey =
  Exclude<SeoPageKey, "home">;

export const toolPageKeys = [
  "timer",
  "stopwatch",
  "pomodoro",
  "worldClock",
  "alarms",
] as const satisfies readonly ToolPageKey[];

export const indexablePageKeys = [
  "home",
  ...toolPageKeys,
] as const satisfies readonly SeoPageKey[];

export const isProductionDeployment =
  process.env.VERCEL_ENV !== undefined
    ? process.env.VERCEL_ENV ===
      "production"
    : process.env.NODE_ENV ===
      "production";

export function absoluteUrl(
  path: string
): string {
  return new URL(
    path,
    siteConfig.url
  ).toString();
}

export function isSeoPageKey(
  value: string | null
): value is SeoPageKey {
  return (
    value !== null &&
    Object.prototype.hasOwnProperty.call(
      seoPages,
      value
    )
  );
}

export function getSocialTitle(
  pageKey: SeoPageKey
): string {
  const page = seoPages[pageKey];

  if (pageKey === "home") {
    return page.title;
  }

  return `${page.title} | ${siteConfig.name}`;
}

function getRobotsMetadata(): Metadata["robots"] {
  if (!isProductionDeployment) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export function createPageMetadata(
  pageKey: SeoPageKey
): Metadata {
  const page = seoPages[pageKey];
  const socialTitle =
    getSocialTitle(pageKey);

  const socialImage =
    `/og?page=${pageKey}`;

  return {
    title:
      pageKey === "home"
        ? {
            absolute: socialTitle,
          }
        : page.title,

    description: page.description,

    keywords: [
      ...siteConfig.keywords,
      ...page.keywords,
    ],

    alternates: {
      canonical: page.path,
    },

    robots: getRobotsMetadata(),

    openGraph: {
      title: socialTitle,
      description: page.description,
      url: page.path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${socialTitle} social preview`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
      images: [socialImage],
    },
  };
}

const googleVerification =
  process.env
    .GOOGLE_SITE_VERIFICATION
    ?.trim();

export const rootMetadata: Metadata = {
  metadataBase: siteConfig.url,

  ...createPageMetadata("home"),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  applicationName:
    siteConfig.applicationName,

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  category: siteConfig.category,

  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
};

export function createRootStructuredData():
  JsonLdObject {
  const homeUrl = absoluteUrl("/");
  const organizationId =
    `${homeUrl}#organization`;
  const websiteId =
    `${homeUrl}#website`;
  const applicationId =
    `${homeUrl}#web-application`;

  return {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: homeUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(
            "/icons/icon-512.png"
          ),
          width: 512,
          height: 512,
        },
      },

      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: homeUrl,
        description:
          siteConfig.description,
        inLanguage:
          siteConfig.language,
        publisher: {
          "@id": organizationId,
        },
      },

      {
        "@type": "WebApplication",
        "@id": applicationId,
        name: siteConfig.name,
        url: homeUrl,
        description:
          siteConfig.description,
        applicationCategory:
          "ProductivityApplication",
        operatingSystem: "Any",
        browserRequirements:
          "Requires JavaScript and a modern web browser.",
        isAccessibleForFree: true,
        featureList: [
          ...seoPages.home.features,
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@id": organizationId,
        },
        isPartOf: {
          "@id": websiteId,
        },
      },
    ],
  };
}

export function createToolStructuredData(
  pageKey: ToolPageKey
): JsonLdObject {
  const page = seoPages[pageKey];
  const pageUrl = absoluteUrl(page.path);
  const homeUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#web-application`,
    name: page.schemaName,
    url: pageUrl,
    description: page.description,
    applicationCategory:
      "ProductivityApplication",
    operatingSystem: "Any",
    browserRequirements:
      "Requires JavaScript and a modern web browser.",
    isAccessibleForFree: true,
    inLanguage: siteConfig.language,
    featureList: [...page.features],

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },

    provider: {
      "@id": `${homeUrl}#organization`,
    },

    isPartOf: {
      "@id": `${homeUrl}#website`,
    },
  };
}