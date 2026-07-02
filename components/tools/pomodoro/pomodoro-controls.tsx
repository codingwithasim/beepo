"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setMode: (mode: "focus" | "shortBreak" | "longBreak") => void;
};

export function PomodoroControls({
  isRunning,
  start,
  pause,
  reset,
  setMode,
}: Props) {
  return (
    <div className="flex gap-4">
      <Button onClick={isRunning ? pause : start}>
        {isRunning ? "Pause" : "Start"}
      </Button>

      <Button onClick={() => setMode("focus")}>
        Focus
      </Button>

      <Button variant="outline" onClick={reset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}