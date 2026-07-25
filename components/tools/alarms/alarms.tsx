"use client";

import { useState } from "react";
import { LucidePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAlarmStore } from "@/stores/alarms-store";

import { AlarmDialog } from "./alarm-dialog";
import { AlarmList } from "./alarm-list";
import { useAlarmChecker } from "./use-alarm-checker";

export function Alarms() {
  useAlarmChecker();

  const [addOpen, setAddOpen] = useState(false);

  const editingAlarmId = useAlarmStore(
    (state) => state.editingAlarmId
  );

  const closeEditAlarm = useAlarmStore(
    (state) => state.closeEditAlarm
  );

  const dialogOpen = addOpen || editingAlarmId !== null;

  function openCreateDialog() {
    closeEditAlarm();
    setAddOpen(true);
  }

  function handleDialogChange(open: boolean) {
    if (!open) {
      setAddOpen(false);
      closeEditAlarm();
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-0">
        {/* Page header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-medium">
              Alarms
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Alarms ring while Beepo is open
            </p>
          </div>

          <Button
            size="sm"
            className={"cursor-pointer"}
            onClick={openCreateDialog}
          >
            <LucidePlus />

            <span className="hidden sm:inline">
              Add Alarm
            </span>
          </Button>
        </div>

        <AlarmList onCreate={openCreateDialog} />
      </div>

      <AlarmDialog
        open={dialogOpen}
        onOpenChange={handleDialogChange}
      />
    </div>
  );
}