"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAlarmStore } from "@/stores/alarms-store";

import {
  inputTimeToMinutes,
  minutesToInputTime,
} from "./alarm-utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AlarmDialog({
  open,
  onOpenChange,
}: Props) {
  const alarms = useAlarmStore((state) => state.alarms);

  const editingAlarmId = useAlarmStore(
    (state) => state.editingAlarmId
  );

  const addAlarm = useAlarmStore((state) => state.addAlarm);

  const updateAlarm = useAlarmStore(
    (state) => state.updateAlarm
  );

  const closeEditAlarm = useAlarmStore(
    (state) => state.closeEditAlarm
  );

  const editingAlarm = editingAlarmId
    ? alarms.find((alarm) => alarm.id === editingAlarmId)
    : undefined;

  const [timeValue, setTimeValue] = useState("07:30");
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    setError(null);

    if (editingAlarm) {
      setTimeValue(minutesToInputTime(editingAlarm.time));
      setLabel(editingAlarm.label);
    } else {
      setTimeValue("07:30");
      setLabel("");
    }
  }, [open, editingAlarm]);

  function handleOpenChange(value: boolean) {
    if (!value) {
      closeEditAlarm();
      setError(null);
    }

    onOpenChange(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const time = inputTimeToMinutes(timeValue);
    const normalizedLabel = label.trim();

    if (time === null) {
      setError("Enter a valid alarm time.");
      return;
    }

    const duplicate = alarms.some(
      (alarm) =>
        alarm.id !== editingAlarm?.id &&
        alarm.time === time &&
        alarm.label.trim().toLowerCase() ===
          normalizedLabel.toLowerCase()
    );

    if (duplicate) {
      setError("An alarm with this time and label already exists.");
      return;
    }

    if (editingAlarm) {
      updateAlarm(editingAlarm.id, {
        time,
        label: normalizedLabel,
      });
    } else {
      addAlarm({
        time,
        label: normalizedLabel,
        enabled: true,
      });
    }

    handleOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="max-w-md overflow-hidden p-0">
        {/* Header */}
        <div className="border-b px-5 py-4">
          <DialogHeader>
            <DialogTitle className="text-base">
              {editingAlarm ? "Edit Alarm" : "Add Alarm"}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Fields */}
          <div className="space-y-4 px-5 py-5">
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
                autoFocus
                required
                value={timeValue}
                onChange={(event) =>
                  setTimeValue(event.target.value)
                }
                className="h-10 font-mono"
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
                maxLength={40}
                placeholder="Wake up, meeting, medicine..."
                onChange={(event) =>
                  setLabel(event.target.value)
                }
                className="h-10"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-sm text-destructive"
              >
                {error}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t px-5 py-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingAlarm ? "Save Changes" : "Add Alarm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}