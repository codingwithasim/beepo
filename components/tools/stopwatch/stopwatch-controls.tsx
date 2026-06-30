"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

type Props = {
  status: "idle" | "running" | "paused";
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export function StopwatchControls({
  status,
  start,
  pause,
  reset,
}: Props) {
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
          Start
        </Button>
      )}

      <Button variant="outline" onClick={reset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}