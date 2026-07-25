"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  LucideAlarmClock,
  LucidePlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { useAlarmStore } from "@/stores/alarms-store";

import { AlarmCard } from "./alarm-card";

type Props = {
  onCreate: () => void;
};

export function AlarmList({
  onCreate,
}: Props) {
  const alarms = useAlarmStore(
    (state) => state.alarms
  );

  const removeAlarm = useAlarmStore(
    (state) => state.removeAlarm
  );

  const toggleAlarm = useAlarmStore(
    (state) => state.toggleAlarm
  );

  const openEditAlarm = useAlarmStore(
    (state) => state.openEditAlarm
  );

  const [now, setNow] =
    useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    const intervalId =
      window.setInterval(() => {
        setNow(new Date());
      }, 30_000);

    return () => {
      window.clearInterval(
        intervalId
      );
    };
  }, []);

  if (!alarms.length) {
    return (
      <div className="py-12">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LucideAlarmClock className="size-5" />
            </EmptyMedia>
          </EmptyHeader>

          <EmptyTitle>
            No alarms yet
          </EmptyTitle>

          <EmptyDescription>
            Create an alarm for
            reminders, meetings, or
            anything you do not want
            to miss.
          </EmptyDescription>

          <Button
            size="sm"
            className="mt-4"
            onClick={onCreate}
          >
            <LucidePlus />
            Add Alarm
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alarms.map((alarm) => (
        <AlarmCard
          key={alarm.id}
          alarm={alarm}
          now={now}
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