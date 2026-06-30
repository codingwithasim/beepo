import { create } from "zustand";

export type Tool =
  | "timer"
  | "stopwatch"
  | "pomodoro"
  | "world-clock"
  | "alarms";

type UIState = {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;

  // 👇 NEW: timer control bridge
  timerActions?: {
    setDuration?: (seconds: number) => void;
    addTime?: (seconds: number) => void; // 👈 NEW
    start?: () => void;
    reset?: () => void;
  };

  setTimerActions: (actions: UIState["timerActions"]) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeTool: "timer",
  setActiveTool: (tool) => set({ activeTool: tool }),

  timerActions: undefined,

  setTimerActions: (actions) =>
    set({ timerActions: actions }),
}));

