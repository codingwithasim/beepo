"use client";

import { useState } from "react";

import {
  AlarmClock,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAlarmStore } from "@/stores/alarms-store";

import { AlarmDialog } from "./alarm-dialog";
import { AlarmList } from "./alarm-list";
import { useAlarmChecker } from "./use-alarm-checker";

export function Alarms() {
  useAlarmChecker();

  const [addOpen, setAddOpen] =
    useState(false);

  const editingAlarmId =
    useAlarmStore(
      (state) =>
        state.editingAlarmId
    );

  const closeEditAlarm =
    useAlarmStore(
      (state) =>
        state.closeEditAlarm
    );

  const dialogOpen =
    addOpen ||
    editingAlarmId !== null;

  function openCreateDialog() {
    closeEditAlarm();
    setAddOpen(true);
  }

  function handleDialogChange(
    open: boolean
  ) {
    if (open) {
      return;
    }

    setAddOpen(false);
    closeEditAlarm();
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 pb-28 pt-6 sm:px-6 sm:pb-10 lg:px-8">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-muted sm:flex">
                <AlarmClock className="size-5" />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Alarms
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Alarms ring while
                  Beepo is open in your
                  browser.
                </p>
              </div>
            </div>
          </div>

          <Button
            className="hidden shrink-0 sm:inline-flex"
            onClick={
              openCreateDialog
            }
          >
            <Plus />
            New alarm
          </Button>
        </header>

        <main className="flex-1">
          <AlarmList
            onCreate={
              openCreateDialog
            }
          />
        </main>
      </div>

      <Button
        size="icon"
        onClick={openCreateDialog}
        aria-label="Create alarm"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 size-14 rounded-2xl shadow-lg sm:hidden"
      >
        <Plus className="size-6" />
      </Button>

      <AlarmDialog
        open={dialogOpen}
        onOpenChange={
          handleDialogChange
        }
      />
    </div>
  );
}