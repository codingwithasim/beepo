import { create } from "zustand";

export type Tool =
  | "timer"
  | "stopwatch"
  | "pomodoro"
  | "world-clock"
  | "alarms";

type PomodoroMode = "focus" | "shortBreak" | "longBreak";

type Lap = {
  id: number;
  split: number;
  total: number;
};

type UIState = {
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

  pomodoroState?: {
    mode: PomodoroMode;
    timeLeft: number;
    isRunning: boolean;
    cycle: number;
  };

  pomodoroActions?: {
    setMode?: (mode: PomodoroMode) => void;
    start?: () => void;
    pause?: () => void;
    reset?: () => void;
  };

  setPomodoroState: (state: UIState["pomodoroState"]) => void;

  setPomodoroActions: (
    actions: UIState["pomodoroActions"]
  ) => void;
};

export const useUIStore = create<UIState>((set) => ({
  timerActions: undefined,

  setTimerActions: (actions) =>
    set({ timerActions: actions }),
  stopwatchLaps: [],
  stopwatchActions: undefined,

  setStopwatchLaps: (laps) =>
    set({ stopwatchLaps: laps }),

  setStopwatchActions: (actions) =>
    set({ stopwatchActions: actions }),

  pomodoroState: {
    mode: "focus",
    timeLeft: 25 * 60,
    isRunning: false,
    cycle: 1,
  },

  pomodoroActions: undefined,

  setPomodoroState: (state) =>
    set({ pomodoroState: state }),

  setPomodoroActions: (actions) =>
    set({ pomodoroActions: actions }),
}));

  