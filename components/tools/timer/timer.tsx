"use client";

import { Card, CardContent } from "@/components/ui/card";

import { TimerDisplay } from "./timer-display";
import { TimerControls } from "./timer-controls";
import { TimerStatus } from "./timer-status";
import { TimerProgress } from "./timer-progress";

import { useTimer } from "./use-timer";

export function TimerTool() {
  const timer = useTimer(25 * 60);

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-4xl rounded-3xl">
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

          <TimerStatus
            status={timer.status}
            duration={timer.duration}
          />
        </CardContent>
      </Card>
    </div>
  );
}