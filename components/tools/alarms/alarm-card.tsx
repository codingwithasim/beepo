"use client";

import type { Alarm } from "@/stores/alarms-store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import {
  LucidePen,
  LucideTrash,
} from "lucide-react";

import {
  formatTimeUntilAlarm,
  minutesToTimeParts,
} from "./alarm-utils";

type Props = {
  alarm: Alarm;
  now: Date | null;

  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
};

export function AlarmCard({
  alarm,
  now,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  const displayTime =
    minutesToTimeParts(
      alarm.time
    );

  const alarmLabel =
    alarm.label.trim() ||
    "Alarm";

  const remainingTime =
    alarm.enabled && now
      ? formatTimeUntilAlarm(
          alarm.time,
          now
        )
      : "Disabled";

  return (
    <Card
      className={[
        "relative w-full max-w-2xl overflow-hidden rounded-xl border bg-background text-foreground",
        !alarm.enabled
          ? "opacity-60"
          : "",
      ].join(" ")}
      data-clarity-mask="true"
    >
      <CardContent className="space-y-3 p-4 sm:p-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-base text-muted-foreground">
            {alarmLabel}
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onEdit}
              aria-label={`Edit ${alarmLabel}`}
            >
              <LucidePen />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onDelete}
              aria-label={`Delete ${alarmLabel}`}
            >
              <LucideTrash />
            </Button>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-end gap-2">
          <p className="font-mono text-2xl">
            {displayTime.hour}:
            {displayTime.minute}{" "}
            <span className="text-sm text-muted-foreground">
              {displayTime.meridiem}
            </span>
          </p>
        </div>

        {/* Remaining time */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {remainingTime}
          </p>

          <Switch
            checked={alarm.enabled}
            onCheckedChange={
              onToggle
            }
            aria-label={
              alarm.enabled
                ? `Disable ${alarmLabel}`
                : `Enable ${alarmLabel}`
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}