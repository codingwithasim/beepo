import { create } from "zustand";

export type Tool = "timer" | "stopwatch" | "pomodoro" | "world-clock" | "alarms";

type UIState = {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeTool: "timer",
  setActiveTool: (tool) => set({ activeTool: tool }),
}));