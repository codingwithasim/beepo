"use client";

import {
  useEffect,
  useState,
} from "react";

import Script from "next/script";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { LucideCookie } from "lucide-react";

const CONSENT_STORAGE_KEY =
  "chrona-analytics-consent";

type AnalyticsConsent =
  | "granted"
  | "denied";

declare global {
  interface Window {
    clarity?: (
      command: string,
      ...args: unknown[]
    ) => void;
  }
}

function sendConsent(
  consent: AnalyticsConsent
) {
  window.clarity?.("consentv2", {
    // "denied" cause Chrona does not use Clarity for advertising.
    ad_Storage: "denied",

    analytics_Storage: consent,
  });
}

function getStoredConsent():
  | AnalyticsConsent
  | null {
  const stored =
    window.localStorage.getItem(
      CONSENT_STORAGE_KEY
    );

  if (
    stored === "granted" ||
    stored === "denied"
  ) {
    return stored;
  }

  return null;
}

function ClarityConsentBanner() {
  const [consent, setConsent] =
    useState<
      AnalyticsConsent | null | "loading"
    >("loading");

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  function selectConsent(
    value: AnalyticsConsent
  ) {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      value
    );

    setConsent(value);
    sendConsent(value);
  }

  if (
    consent === "loading" ||
    consent !== null
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-100 w-[390px] max-w-[calc(100vw-2rem)]">
      <Card
        role="dialog"
        aria-label="Analytics preferences"
        className="shadow-xl"
      >
        <CardContent className="space-y-4 px-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LucideCookie className="size-4 text-primary" />

              <p className="text-sm font-semibold">
                Help improve Chrona
              </p>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              Allow anonymous analytics to help us understand how Chrona is used and improve future updates. <span className="font-medium text-foreground">We don't collect personal information or show ads</span>.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectConsent("denied")}
            >
              Not now
            </Button>

            <Button
              size="sm"
              onClick={() => selectConsent("granted")}
            >
              Help improve
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ClarityAnalytics() {
  const projectId =
    process.env
      .NEXT_PUBLIC_CLARITY_PROJECT_ID;

  const enabled =
    process.env
      .NEXT_PUBLIC_CLARITY_ENABLED ===
      "true";

  const validProjectId =
    Boolean(projectId) &&
    /^[a-zA-Z0-9]+$/.test(
      projectId ?? ""
    );

  if (!enabled || !validProjectId) {
    return null;
  }

  return (
    <>
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        onLoad={() => {
          const consent =
            getStoredConsent();

          if (consent) {
            sendConsent(consent);
          }
        }}
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){
                (c[a].q=c[a].q||[]).push(arguments)
              };

              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;

              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(
              window,
              document,
              "clarity",
              "script",
              "${projectId}"
            );
          `,
        }}
      />

      <ClarityConsentBanner />
    </>
  );
}