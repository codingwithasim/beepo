import { ImageResponse } from "next/og";

import {
  getSocialTitle,
  isSeoPageKey,
  seoPages,
  siteConfig,
} from "@/lib/seo";

export const runtime = "edge";

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

export function GET(
  request: Request
) {
  const searchParams = new URL(
    request.url
  ).searchParams;

  const requestedPage =
    searchParams.get("page");

  const pageKey = isSeoPageKey(
    requestedPage
  )
    ? requestedPage
    : "home";

  const page = seoPages[pageKey];
  const title =
    getSocialTitle(pageKey);

  const titleSize =
    title.length > 58 ? 56 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #09090b 0%, #18181b 55%, #27272a 100%)",
          color: "#fafafa",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -180,
            display: "flex",
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              "rgba(255,255,255,0.055)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -180,
            display: "flex",
            width: 650,
            height: 650,
            borderRadius: 9999,
            background:
              "rgba(255,255,255,0.035)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 32,
            display: "flex",
            border:
              "1px solid rgba(255,255,255,0.12)",
            borderRadius: 28,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent:
              "space-between",
            width: "100%",
            height: "100%",
            padding: "72px 84px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                width: 58,
                height: 58,
                border:
                  "1px solid rgba(255,255,255,0.18)",
                borderRadius: 16,
                background:
                  "rgba(255,255,255,0.09)",
                fontSize: 31,
                fontWeight: 700,
              }}
            >
              C
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Chrona
            </div>

            <div
              style={{
                display: "flex",
                marginLeft: 6,
                padding: "8px 14px",
                border:
                  "1px solid rgba(255,255,255,0.14)",
                borderRadius: 9999,
                color:
                  "rgba(255,255,255,0.7)",
                fontSize: 18,
              }}
            >
              {page.displayName}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 1020,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: titleSize,
                fontWeight: 750,
                lineHeight: 1.05,
                letterSpacing: "-0.045em",
              }}
            >
              {title}
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 930,
                color:
                  "rgba(255,255,255,0.7)",
                fontSize: 27,
                lineHeight: 1.35,
              }}
            >
              {page.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              color:
                "rgba(255,255,255,0.52)",
              fontSize: 20,
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              Free online productivity
              tools
            </div>

            <div
              style={{
                display: "flex",
              }}
            >
              {siteConfig.url.hostname}
              {page.path === "/"
                ? ""
                : page.path}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,

      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
      },
    }
  );
}