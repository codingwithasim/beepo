"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Alarm = {
  id: string;

  /**
   * Minutes since midnight.
   *
   * Examples:
   * 07:30 => 450
   * 13:15 => 795
   */
  time: number;

  label: string;
  enabled: boolean;

  createdAt: number;
  updatedAt: number;

  /**
   * Local date key used to prevent duplicate triggers.
   *
   * Example:
   * "2026-07-25"
   */
  lastTriggeredDate?: string;
};

export type AlarmMutationResult =
  | {
    success: true;
  }
  | {
    success: false;
    reason: "duplicate" | "invalid-time" | "not-found";
  };

type AddAlarmInput = {
  time: number;
  label: string;
  enabled?: boolean;
};

type AlarmUpdates = Partial<
  Pick<Alarm, "time" | "label" | "enabled">
>;

type AlarmStore = {
  alarms: Alarm[];

  editingAlarmId: string | null;
  hasHydrated: boolean;

  addAlarm: (
    alarm: AddAlarmInput
  ) => AlarmMutationResult;

  updateAlarm: (
    id: string,
    updates: AlarmUpdates
  ) => AlarmMutationResult;

  removeAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;
  disableAlarm: (id: string) => void;

  openEditAlarm: (id: string) => void;
  closeEditAlarm: () => void;

  triggerAlarm: (
    id: string,
    date: string
  ) => void;

  getAlarm: (
    id: string
  ) => Alarm | undefined;

  setHasHydrated: (
    hasHydrated: boolean
  ) => void;
};

function isValidAlarmTime(time: number) {
  return (
    Number.isInteger(time) &&
    time >= 0 &&
    time < 24 * 60
  );
}

function normalizeLabel(label: string) {
  return label.trim();
}

function labelsMatch(
  first: string,
  second: string
) {
  return (
    normalizeLabel(first).toLowerCase() ===
    normalizeLabel(second).toLowerCase()
  );
}

function createAlarmId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function sortAlarms(alarms: Alarm[]) {
  return [...alarms].sort(
    (first, second) =>
      first.time - second.time ||
      first.createdAt - second.createdAt
  );
}

export const useAlarmStore =
  create<AlarmStore>()(
    persist(
      (set, get) => ({
        alarms: [],

        editingAlarmId: null,
        hasHydrated: false,

        addAlarm: ({
          time,
          label,
          enabled = true,
        }) => {
          if (!isValidAlarmTime(time)) {
            return {
              success: false,
              reason: "invalid-time",
            };
          }

          const normalizedLabel =
            normalizeLabel(label);

          const duplicate =
            get().alarms.some(
              (alarm) =>
                alarm.time === time &&
                labelsMatch(
                  alarm.label,
                  normalizedLabel
                )
            );

          if (duplicate) {
            return {
              success: false,
              reason: "duplicate",
            };
          }

          const timestamp = Date.now();

          const alarm: Alarm = {
            id: createAlarmId(),
            time,
            label: normalizedLabel,
            enabled,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

          set((state) => ({
            alarms: sortAlarms([
              ...state.alarms,
              alarm,
            ]),
          }));

          return {
            success: true,
          };
        },

        updateAlarm: (
          id,
          updates
        ) => {
          const currentAlarm =
            get().alarms.find(
              (alarm) => alarm.id === id
            );

          if (!currentAlarm) {
            return {
              success: false,
              reason: "not-found",
            };
          }

          const nextTime =
            updates.time ??
            currentAlarm.time;

          if (!isValidAlarmTime(nextTime)) {
            return {
              success: false,
              reason: "invalid-time",
            };
          }

          const nextLabel =
            updates.label !== undefined
              ? normalizeLabel(
                updates.label
              )
              : currentAlarm.label;

          const duplicate =
            get().alarms.some(
              (alarm) =>
                alarm.id !== id &&
                alarm.time === nextTime &&
                labelsMatch(
                  alarm.label,
                  nextLabel
                )
            );

          if (duplicate) {
            return {
              success: false,
              reason: "duplicate",
            };
          }

          set((state) => ({
            alarms: sortAlarms(
              state.alarms.map(
                (alarm) => {
                  if (alarm.id !== id) {
                    return alarm;
                  }

                  const timeChanged =
                    nextTime !== alarm.time;

                  return {
                    ...alarm,
                    time: nextTime,
                    label: nextLabel,
                    enabled:
                      updates.enabled ??
                      alarm.enabled,

                    /**
                     * An alarm edited to another
                     * time must be allowed to
                     * trigger again today.
                     */
                    lastTriggeredDate:
                      timeChanged
                        ? undefined
                        : alarm.lastTriggeredDate,

                    updatedAt: Date.now(),
                  };
                }
              )
            ),
          }));

          return {
            success: true,
          };
        },

        removeAlarm: (id) =>
          set((state) => ({
            alarms:
              state.alarms.filter(
                (alarm) =>
                  alarm.id !== id
              ),

            editingAlarmId:
              state.editingAlarmId === id
                ? null
                : state.editingAlarmId,
          })),

        toggleAlarm: (id) =>
          set((state) => ({
            alarms:
              state.alarms.map(
                (alarm) =>
                  alarm.id === id
                    ? {
                      ...alarm,
                      enabled:
                        !alarm.enabled,
                      updatedAt:
                        Date.now(),
                    }
                    : alarm
              ),
          })),

        disableAlarm: (id) =>
          set((state) => ({
            alarms:
              state.alarms.map(
                (alarm) =>
                  alarm.id === id
                    ? {
                      ...alarm,
                      enabled: false,
                      updatedAt:
                        Date.now(),
                    }
                    : alarm
              ),
          })),

        openEditAlarm: (id) =>
          set({
            editingAlarmId: id,
          }),

        closeEditAlarm: () =>
          set({
            editingAlarmId: null,
          }),

        /**
         * Marks and disables the alarm
         * atomically in one store update.
         */
        triggerAlarm: (id, date) => {
          const alarm = get().alarms.find(
            (item) => item.id === id
          );

          if (
            !alarm ||
            !alarm.enabled ||
            alarm.lastTriggeredDate === date
          ) {
            return false;
          }

          set((state) => ({
            alarms: state.alarms.map(
              (item) =>
                item.id === id
                  ? {
                    ...item,
                    enabled: false,
                    lastTriggeredDate: date,
                    updatedAt: Date.now(),
                  }
                  : item
            ),
          }));

          return true;
        },

        getAlarm: (id) =>
          get().alarms.find(
            (alarm) => alarm.id === id
          ),

        setHasHydrated: (
          hasHydrated
        ) =>
          set({
            hasHydrated,
          }),
      }),
      {
        name: "alarms-storage",

        /**
         * UI state should not survive
         * page refreshes.
         */
        partialize: (state) => ({
          alarms: state.alarms,
        }),

        onRehydrateStorage:
          () => (state) => {
            state?.setHasHydrated(true);
          },
      }
    )
  );