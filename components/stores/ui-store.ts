import { create } from "zustand";

export type Tool =
  | "timer"
  | "stopwatch"
  | "pomodoro"
  | "world-clock"
  | "alarms";


type Lap = {
  id: number;
  split: number;
  total: number;
};

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

  stopwatchLaps: Lap[];

  stopwatchActions?: {
    lap?: () => void;
    clearLaps?: () => void;
  };

  setStopwatchLaps: (laps: Lap[]) => void;

  setStopwatchActions: (
    actions: UIState["stopwatchActions"]
  ) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeTool: "timer",
  setActiveTool: (tool) => set({ activeTool: tool }),

  timerActions: undefined,

  setTimerActions: (actions) =>
    set({ timerActions: actions }),
  stopwatchLaps: [],
  stopwatchActions: undefined,

  setStopwatchLaps: (laps) =>
    set({ stopwatchLaps: laps }),

  setStopwatchActions: (actions) =>
    set({ stopwatchActions: actions }),
}));

