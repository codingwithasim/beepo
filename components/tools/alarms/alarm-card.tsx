"use client";

import type { Alarm } from "@/stores/alarms-store";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Switch } from "@/components/ui/switch";

import {
  minutesToTimeParts,
} from "./alarm-utils";

type Props = {
  alarm: Alarm;

  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
};

export function AlarmCard({
  alarm,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  const { time, period } =
    minutesToTimeParts(
      alarm.time
    );

  const alarmName =
    alarm.label || "Alarm";

  return (
    <Card
      className={[
        "overflow-hidden rounded-2xl transition-colors",
        alarm.enabled
          ? "bg-card"
          : "bg-muted/30",
      ].join(" ")}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <div
              className={[
                "flex items-baseline gap-2",
                alarm.enabled
                  ? ""
                  : "text-muted-foreground",
              ].join(" ")}
            >
              <span className="font-mono text-4xl font-medium tracking-tight sm:text-5xl">
                {time}
              </span>

              <span className="text-sm font-medium">
                {period}
              </span>
            </div>

            <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2">
              <p className="max-w-full truncate text-sm font-medium">
                {alarmName}
              </p>

              <Badge
                variant={
                  alarm.enabled
                    ? "default"
                    : "secondary"
                }
                className="rounded-full"
              >
                {alarm.enabled
                  ? "On"
                  : "Off"}
              </Badge>

              <span className="text-xs text-muted-foreground">
                Once
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Switch
              checked={
                alarm.enabled
              }
              onCheckedChange={
                onToggle
              }
              aria-label={`${
                alarm.enabled
                  ? "Disable"
                  : "Enable"
              } ${alarmName}`}
            />

            <DropdownMenu>
              <DropdownMenuTrigger
                
              >
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Actions for ${alarmName}`}
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
              >
                <DropdownMenuItem
                  onClick={onEdit}
                >
                  <Pencil />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}