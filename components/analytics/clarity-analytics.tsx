"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Clarity from "@microsoft/clarity";
import { LucideCookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const CONSENT_STORAGE_KEY =
  "chrona-analytics-consent";

type AnalyticsConsent =
  | "granted"
  | "denied";

type ConsentState =
  | AnalyticsConsent
  | null
  | "loading";

function getStoredConsent():
  | AnalyticsConsent
  | null {
  try {
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
  } catch {
    return null;
  }
}

function storeConsent(
  consent: AnalyticsConsent
) {
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      consent
    );
  } catch {
    // Analytics consent still applies for
    // this page, even if storage is blocked.
  }
}

function applyClarityConsent(
  consent: AnalyticsConsent
) {
  Clarity.consentV2({
    // Chrona does not use Clarity for advertising.
    ad_Storage: "denied",
    analytics_Storage: consent,
  });
}

type ClarityConsentBannerProps = {
  consent: ConsentState;
  onSelect: (
    value: AnalyticsConsent
  ) => void;
};

function ClarityConsentBanner({
  consent,
  onSelect,
}: ClarityConsentBannerProps) {
  if (
    consent === "loading" ||
    consent !== null
  ) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-x-4
        bottom-[max(1rem,env(safe-area-inset-bottom))]
        z-100
        sm:inset-x-auto
        sm:bottom-6
        sm:right-6
        sm:w-[390px]
      "
    >
      <Card
        role="dialog"
        aria-modal="false"
        aria-labelledby="analytics-consent-title"
        aria-describedby="analytics-consent-description"
        className="rounded-xl bg-background shadow-xl"
      >
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <LucideCookie className="size-4" />
              </div>

              <p
                id="analytics-consent-title"
                className="text-sm font-semibold"
              >
                Help improve Chrona
              </p>
            </div>

            <p
              id="analytics-consent-description"
              className="text-sm leading-6 text-muted-foreground"
            >
              Allow usage analytics and
              privacy-masked session recordings
              to help understand how Chrona is
              used and improve future updates.{" "}
              <span className="font-medium text-foreground">
                This data is not used for
                advertising.
              </span>
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 min-[380px]:flex-row min-[380px]:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onSelect("denied")
              }
            >
              Not now
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={() =>
                onSelect("granted")
              }
            >
              Allow analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ClarityAnalytics() {
  const initializedRef =
    useRef(false);

  const [consent, setConsent] =
    useState<ConsentState>(
      "loading"
    );

  const enabled =
    process.env
      .NEXT_PUBLIC_CLARITY_ENABLED ===
    "true";

  const projectId =
    process.env
      .NEXT_PUBLIC_CLARITY_PROJECT_ID;

  useEffect(() => {
    const storedConsent =
      getStoredConsent();

    setConsent(storedConsent);

    if (!enabled) {
      console.info(
        "[Clarity] Disabled"
      );

      return;
    }

    if (!projectId) {
      console.error(
        "[Clarity] Project ID missing"
      );

      return;
    }

    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    try {
      Clarity.init(projectId);

      console.info(
        "[Clarity] Initialized"
      );

      if (storedConsent) {
        applyClarityConsent(
          storedConsent
        );
      }
    } catch (error) {
      initializedRef.current = false;

      console.error(
        "[Clarity] Initialization error",
        error
      );
    }
  }, [enabled, projectId]);

  const selectConsent =
    useCallback(
      (
        value: AnalyticsConsent
      ) => {
        storeConsent(value);
        setConsent(value);

        if (
          enabled &&
          projectId &&
          initializedRef.current
        ) {
          applyClarityConsent(
            value
          );
        }
      },
      [enabled, projectId]
    );

  if (!enabled || !projectId) {
    return null;
  }

  return (
    <ClarityConsentBanner
      consent={consent}
      onSelect={selectConsent}
    />
  );
}