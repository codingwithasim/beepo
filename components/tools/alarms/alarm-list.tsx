"use client";

import {
  AlarmClock,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { useAlarmStore } from "@/stores/alarms-store";

import { AlarmCard } from "./alarm-card";

type Props = {
  onCreate: () => void;
};

export function AlarmList({
  onCreate,
}: Props) {
  const alarms =
    useAlarmStore(
      (state) => state.alarms
    );

  const hasHydrated =
    useAlarmStore(
      (state) =>
        state.hasHydrated
    );

  const removeAlarm =
    useAlarmStore(
      (state) =>
        state.removeAlarm
    );

  const toggleAlarm =
    useAlarmStore(
      (state) =>
        state.toggleAlarm
    );

  const openEditAlarm =
    useAlarmStore(
      (state) =>
        state.openEditAlarm
    );

  if (!hasHydrated) {
    return (
      <div className="space-y-3">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-28 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (!alarms.length) {
    return (
      <Card className="border-dashed bg-muted/20">
        <CardContent className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted">
            <AlarmClock className="size-7 text-muted-foreground" />
          </div>

          <h2 className="text-lg font-semibold">
            No alarms yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Create an alarm for
            reminders, meetings, or
            anything you do not want
            to miss.
          </p>

          <Button
            className="mt-6"
            onClick={onCreate}
          >
            <Plus />
            Create alarm
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {alarms.map((alarm) => (
        <AlarmCard
          key={alarm.id}
          alarm={alarm}
          onDelete={() =>
            removeAlarm(alarm.id)
          }
          onToggle={() =>
            toggleAlarm(alarm.id)
          }
          onEdit={() =>
            openEditAlarm(
              alarm.id
            )
          }
        />
      ))}
    </div>
  );
}