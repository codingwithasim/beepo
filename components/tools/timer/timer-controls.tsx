"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

type TimerControlsProps = {
  status: "idle" | "running" | "paused" | "finished";
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export function TimerControls({
  status,
  start,
  pause,
  reset,
}: TimerControlsProps) {
  return (
    <div className="flex gap-4">
      {status === "running" ? (
        <Button onClick={pause}>
          <Pause className="mr-2 h-4 w-4" />
          Pause
        </Button>
      ) : (
        <Button onClick={start}>
          <Play className="mr-2 h-4 w-4" />
          {status === "paused" ? "Resume" : "Start"}
        </Button>
      )}

      <Button variant="outline" onClick={reset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}