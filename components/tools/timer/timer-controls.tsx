"use client";

import { useUIStore } from "@/components/stores/ui-store";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

type TimerControlsProps = {
  status: "idle" | "running" | "paused" | "finished";
  start: () => void;
  pause: () => void;
  reset: () => void;
};

const stamps = [1, 5, 10, 25]

export function TimerControls({
  status,
  start,
  pause,
  reset,
}: TimerControlsProps) {

  const timerActions = useUIStore((s) => s.timerActions);

  return (
    <div className="flex flex-col gap-4">

      <div>
        {
          stamps.map(stamp => {
            return (
              <Button
                key={stamp}
                variant={"ghost"}
                className="cursor-pointer text-black/40 hover:bg-background"
                onClick={()=> timerActions?.addTime?.(stamp * 60)}
              >
                +{stamp} min
              </Button>
            )
          })
        }
      </div>

      <div className="flex gap-4 justify-center">
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

      
    </div>
  );
}