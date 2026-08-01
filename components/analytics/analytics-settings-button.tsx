"use client";

import { Button } from "@/components/ui/button";

const CONSENT_STORAGE_KEY =
  "chrona-analytics-consent";

export function AnalyticsSettingsButton() {
  function resetPreference() {
    window.localStorage.removeItem(
      CONSENT_STORAGE_KEY
    );

    window.location.reload();
  }

  return (
    <Button
      type="button"
      variant="link"
      size="sm"
      onClick={resetPreference}
      className="h-auto p-0 text-muted-foreground"
    >
      Analytics settings
    </Button>
  );
}