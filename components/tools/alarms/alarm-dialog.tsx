"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAlarmStore } from "@/stores/alarms-store";

import {
  minutesToInputValue,
  timeInputToMinutes,
} from "./alarm-utils";

type Props = {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;
};

export function AlarmDialog({
  open,
  onOpenChange,
}: Props) {
  const editingAlarmId =
    useAlarmStore(
      (state) =>
        state.editingAlarmId
    );

  const editingAlarm =
    useAlarmStore((state) => {
      if (!state.editingAlarmId) {
        return undefined;
      }

      return state.alarms.find(
        (alarm) =>
          alarm.id ===
          state.editingAlarmId
      );
    });

  const addAlarm =
    useAlarmStore(
      (state) => state.addAlarm
    );

  const updateAlarm =
    useAlarmStore(
      (state) =>
        state.updateAlarm
    );

  const [timeValue, setTimeValue] =
    useState("07:30");

  const [label, setLabel] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const isEditing =
    editingAlarmId !== null;

  useEffect(() => {
    if (!open) {
      return;
    }

    setError(null);

    if (editingAlarm) {
      setTimeValue(
        minutesToInputValue(
          editingAlarm.time
        )
      );

      setLabel(
        editingAlarm.label
      );

      return;
    }

    setTimeValue("07:30");
    setLabel("");
  }, [open, editingAlarm]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const time =
      timeInputToMinutes(
        timeValue
      );

    if (time === null) {
      setError(
        "Enter a valid alarm time."
      );

      return;
    }

    if (
      isEditing &&
      !editingAlarm
    ) {
      setError(
        "This alarm no longer exists."
      );

      return;
    }

    const result = editingAlarm
      ? updateAlarm(
          editingAlarm.id,
          {
            time,
            label,
          }
        )
      : addAlarm({
          time,
          label,
          enabled: true,
        });

    if (!result.success) {
      if (
        result.reason ===
        "duplicate"
      ) {
        setError(
          "An alarm with this time and label already exists."
        );
      } else if (
        result.reason ===
        "invalid-time"
      ) {
        setError(
          "Enter a valid alarm time."
        );
      } else {
        setError(
          "The alarm could not be found."
        );
      }

      return;
    }

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit alarm"
              : "Create alarm"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Update the alarm time or label."
              : "Choose when the alarm should ring."}
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label
              htmlFor="alarm-time"
              className="text-sm font-medium"
            >
              Time
            </label>

            <Input
              id="alarm-time"
              type="time"
              step={60}
              value={timeValue}
              onChange={(event) =>
                setTimeValue(
                  event.target.value
                )
              }
              className="h-14 font-mono text-xl"
              autoFocus
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="alarm-label"
              className="text-sm font-medium"
            >
              Label
            </label>

            <Input
              id="alarm-label"
              value={label}
              onChange={(event) =>
                setLabel(
                  event.target.value
                )
              }
              maxLength={40}
              placeholder="Wake up, meeting, medicine..."
            />

            <p className="text-xs text-muted-foreground">
              Optional · Maximum 40
              characters
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button type="submit">
              {isEditing
                ? "Save changes"
                : "Create alarm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}