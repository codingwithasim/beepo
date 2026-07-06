import { create } from "zustand";
import { persist } from "zustand/middleware";

type TimerActions = {
    setDuration?: (seconds: number) => void;
    addTime?: (seconds: number) => void;
    start?: () => void;
    reset?: () => void;
};

export type TimerPreset = {
    id: string;
    label: string;
    duration: number;
};

type TimerStore = {
  // Bridge to the Timer component
  actions?: TimerActions;
  setActions: (actions: TimerActions | undefined) => void;

  // Presets
  presets: TimerPreset[];
  addPreset: (preset: TimerPreset) => void;
  removePreset: (id: string) => void;
  updatePreset: (preset: TimerPreset) => void;
};

const defaultPresets: TimerPreset[] = [
  {
    id: crypto.randomUUID(),
    label: "5 min",
    duration: 5 * 60,
  },
  {
    id: crypto.randomUUID(),
    label: "10 min",
    duration: 10 * 60,
  },
  {
    id: crypto.randomUUID(),
    label: "25 min",
    duration: 25 * 60,
  },
  {
    id: crypto.randomUUID(),
    label: "45 min",
    duration: 45 * 60,
  },
  {
    id: crypto.randomUUID(),
    label: "60 min",
    duration: 60 * 60,
  },
];

export const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      actions: undefined,

      setActions: (actions) => set({ actions }),

      presets: defaultPresets,

      addPreset: (preset) =>
        set((state) => ({
          presets: [...state.presets, preset],
        })),

      removePreset: (id) =>
        set((state) => ({
          presets: state.presets.filter((p) => p.id !== id),
        })),

      updatePreset: (preset) =>
        set((state) => ({
          presets: state.presets.map((p) =>
            p.id === preset.id ? preset : p
          ),
        })),
    }),
    {
      name: "timer-store",

      partialize: (state) => ({
        presets: state.presets,
      }),
    }
  )
);