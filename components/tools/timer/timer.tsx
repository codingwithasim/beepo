"use client";

import { Card, CardContent } from "@/components/ui/card";

import { TimerDisplay } from "./timer-display";
import { TimerControls } from "./timer-controls";
import { TimerProgress } from "./timer-progress";
import { useEffect } from "react";

import { useTimer } from "./use-timer";
import { useUIStore } from "@/components/stores/ui-store";

export function TimerTool() {
  const timer = useTimer(25 * 60);

  const setTimerActions = useUIStore((s) => s.setTimerActions);

    useEffect(() => {
      setTimerActions({
        setDuration: timer.changeDuration,
        addTime: timer.addTime, // 👈 NEW
        start: timer.start,
        reset: timer.reset,
      });

      return () => setTimerActions(undefined);
    }, [timer]);

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full ring-0 shadow-none bg-background max-w-4xl rounded-3xl">
        <CardContent className="flex flex-col items-center gap-10 py-16">
          
          <TimerDisplay remaining={timer.remaining} />

          {/* NEW: progress bar */}
          <div className="w-full max-w-md px-6">
            <TimerProgress
              remaining={timer.remaining}
              duration={timer.duration}
            />
          </div>

          <TimerControls
            status={timer.status}
            start={timer.start}
            pause={timer.pause}
            reset={timer.reset}
          />
        </CardContent>
      </Card>
    </div>
  );
}